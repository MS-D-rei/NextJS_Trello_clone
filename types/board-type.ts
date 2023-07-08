import { Models } from "appwrite";

export interface ColumnsData {
  byId: Record<StatusType, Column>;
  allIds: StatusType[];
}

export interface Column {
  id: StatusType;
  todoIds: string[];
}

export interface TodosData {
  byId: Record<string, Todo>;
  allIds: string[];
}

export interface Todo extends Models.Document {
  readonly $id: string;
  title: string;
  status: StatusType;
  image?: AppwriteImage;
  readonly $createdAt: string;
  readonly $updatedAt: string;
}

export type StatusType = "todo" | "in-progress" | "done";

export interface AppwriteImage {
  readonly $bucketId: string;
  fileId: string;
}
