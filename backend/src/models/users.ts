import mongoose, { Schema, Document } from "mongoose";

//creating an interface for users schema for type safety
/* 

here while creating an interface it extends from Document from the mongoose ORM

*/
export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
}

//creating schema using the interface
const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
