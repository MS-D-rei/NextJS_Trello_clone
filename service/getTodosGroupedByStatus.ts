import { databases } from "@/appwrite";

export const getTodosGroupedByStatus = async () => {
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
  return response;
};

