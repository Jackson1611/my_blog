import { Schema, model } from "mongoose";
import { IBlog } from "./../types/blog";

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
},
{ timestamps: true });

export default model<IBlog>("Blog", BlogSchema);


