import { Models } from "appwrite";

export interface Board {
  columns: Map<StatusType, BoardColumn>;
}

export interface BoardColumn {
  id: StatusType;
  todos: Todos;
}

export interface Todos {
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
