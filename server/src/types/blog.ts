import { Document,Schema } from "mongoose"

export interface IBlog extends Document {
  title: string
  author: string
  url: string
  likes: Number
  user: Schema.Types.ObjectId;
}