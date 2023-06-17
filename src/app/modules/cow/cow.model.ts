import { Schema, model } from "mongoose";
import { ICows, cowModel } from "./cow.interface";

const cowSchema = new Schema<ICows>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    enum: [
      "Dhaka",
      "Chattogram",
      "Barishal",
      "Rajshahi",
      "Sylhet",
      "Comilla",
      "Rangpur",
      "Mymensingh",
    ],
    required: true,
  },
  breed: {
    type: String,
    enum: [
      "Brahman",
      "Nellore",
      "Sahiwal",
      "Gir",
      "Indigenous",
      "Tharparkar",
      "Kankrej",
    ],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    enum: ["for sale", "sold out"],
    default: "for sale",
  },
  category: {
    type: String,
    enum: ["Dairy", "Beef", "Dual Purpose"],
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Cow = model<ICows, cowModel>("cows", cowSchema);

export default Cow;
