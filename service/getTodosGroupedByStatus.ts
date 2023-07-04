import { databases } from "@/appwrite";

export const getTodosGroupedByStatus = async () => {
  const response = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID, 
  );

  console.log(response);
};
