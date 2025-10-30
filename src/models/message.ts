import mongoose, { Schema, Model } from "mongoose";

export interface MessageDoc extends mongoose.Document {
  author: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<MessageDoc>(
  {
    author: { type: String, required: true, trim: true, maxlength: 64 },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Message: Model<MessageDoc> =
  (mongoose.models.Message as Model<MessageDoc>) ||
  mongoose.model<MessageDoc>("Message", MessageSchema);
