import { ObjectId } from "mongodb";

export interface Resolution {
  goal: string;
  completed: boolean;
  priority?: number;
  dueDate?: Date;
  _id?: ObjectId;
}