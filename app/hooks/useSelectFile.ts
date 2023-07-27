import { ChangeEvent, useState } from "react";

export const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    console.log("select file:", event.target.files);

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        console.log("readerEvent", readerEvent);
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    selectFile,
  };
};
