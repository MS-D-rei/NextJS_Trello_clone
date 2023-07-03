export interface Board {
  columns: Map<StatusType, BoardColumn>;
}

export interface BoardColumn {
  id: StatusType;
  todos: {
    byId: Record<string, Todo>;
    allIds: string[];
  };
}

export interface Todo {
  readonly $id: string;
  title: string;
  status: StatusType;
  image?: AppwriteImage;
  readonly $createdAt: string;
  updatedAt?: string;
}

export type StatusType = "todo" | "in-progress" | "done";

export interface AppwriteImage {
  readonly $bucketId: string;
  fileId: string;
}
