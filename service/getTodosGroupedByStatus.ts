import { databases } from "@/appwrite";
import { Board, BoardColumn, StatusType } from "@/types/board-type";

export const getTodosGroupedByStatus = async () => {
  // fetch todos from Appwrite database

  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID
  );

  // console.log(response);
  // Models.DocumentList: {
  //  "documents": Models.Document[],
  //  "total": number,
  // }
  // Models.Document: {
  // $id: "64a3f5798fbf0de217af"
  // $databaseId: "64a2826e36ff54efc383"
  // $collectionId: "64a283667d439ae9c223"
  // $permissions: []
  // $createdAt: "2023-07-04T10:33:29.589+00:00"
  // $updatedAt: "2023-07-04T10:33:29.589+00:00"
  // title: "Test Task 1"
  // image: null
  // status: "todo"
  // }
  //

  // transform response.documents to Board data type

  const todos = response.documents;

  let initialBoard: Board = {
    columns: new Map<StatusType, BoardColumn>([
      ["todo", { id: "todo", todos: { byId: {}, allIds: [] } }],
      ["in-progress", { id: "in-progress", todos: { byId: {}, allIds: [] } }],
      ["done", { id: "done", todos: { byId: {}, allIds: [] } }],
    ]),
  };

  const board = todos.reduce((board, todo) => {
    const column = board.columns.get(todo.status);
    if (!column) {
      return board;
    }

    column.todos.byId[todo.$id] = {
      ...todo,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    };
    column.todos.allIds.push(todo.$id);

    return board;
  }, initialBoard);

  return board;
};
