import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (orderedBooks: any, userInfo: any) => {
  console.log(userInfo);
  const order = await prisma.order.create({
    data: {
      userId: userInfo.userId,
      orderedBooks: {
        createMany: {
          data: orderedBooks.map((item: any) => ({
            bookId: item.bookId,
            quantity: item.quantity,
          })),
        },
      },
    },
    include: {
      orderedBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  const data = {
    id: order.id,
    userId: order.userId,
    orderedBooks: order.orderedBooks.map((item) => ({
      bookId: item.book.id,
      quantity: item.quantity,
    })),
    status: order.status,
    createdAt: order.createdAt,
  };

  return data;
};

const getAllFromDB = async (userInfo: any) => {
  const { role, userId } = userInfo;

  // Define the Prisma query options based on the user's role
  const queryOptions = {
    include: {
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  };

  if (role === "admin") {
    return await prisma.order.findMany(queryOptions);
  } else if (role === "customer") {
    return await prisma.order.findMany({
      ...queryOptions,
      where: {
        userId: userId,
      },
    });
  }
};

const getSingleFromDB = async (id: string, userInfo: any) => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderedBooks: {
        select: {
          bookId: true,
          quantity: true,
        },
      },
    },
  });

  if (userInfo.role == "admin") {
    return order;
  }

  if (userInfo.role == "customer" && userInfo.userId == order?.userId) {
    return order;
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "you have no access ");
  }
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getSingleFromDB,
};
