import mongoose, { Document, Schema } from "mongoose";
import { UserInterface } from "./users";

interface PostInterface extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

export const blogSchema = new Schema<PostInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", blogSchema);
