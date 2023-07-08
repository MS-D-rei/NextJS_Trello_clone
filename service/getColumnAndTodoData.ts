import { databases } from "@/appwrite";
import { ColumnsData, StatusType, TodosData } from "@/types/board-type";

export const getColumnAndTodoData = async () => {
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

  let initialColumnData: ColumnsData = {
    byId: {
      todo: { id: "todo", todoIds: [] },
      "in-progress": { id: "in-progress", todoIds: [] },
      done: { id: "done", todoIds: [] },
    },
    allIds: ["todo", "in-progress", "done"],
  };

  let initialTodoData: TodosData = {
    byId: {},
    allIds: [],
  };

  const columnsData = todos.reduce((acc, todo) => {
    const todoStatus = todo.status as StatusType;
    acc.byId[todoStatus].todoIds.push(todo.$id);

    return acc;
  }, initialColumnData);

  const todosData = todos.reduce((acc, todo) => {
    acc.byId[todo.$id] = {
      ...todo,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    };

    acc.allIds.push(todo.$id);

    return acc;
  }, initialTodoData);

  return {
    columnsData,
    todosData,
  };
};
