"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useSelectFile } from "@/app/hooks/useSelectFile";
import Button from "@/app/components/Button";

const ImageUpload = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const { selectFile, setSelectedFile, selectedFile } = useSelectFile();

  const handleUpload = () => {
    selectedFileRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event);
  };

  const handleImageCancel = () => {
    setSelectedFile("");
  };

  return (
    <div className="flex items-center justify-center w-full">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt="selectedImage"
            width={100}
            height={100}
            priority={false}
          />
          <Button type="button" secondary onClick={handleImageCancel}>
            cancel
          </Button>
        </>
      ) : (
        <div>
          <Button type="button" onClick={handleUpload}>
            Upload
          </Button>
          <input
            type="file"
            ref={selectedFileRef}
            hidden
            aria-hidden={true}
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
