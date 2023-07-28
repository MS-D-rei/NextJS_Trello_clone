"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useSelectFile } from "@/app/hooks/useSelectFile";
import Button from "@/app/components/Button";
import { PhotoIcon } from "@heroicons/react/24/solid";

const ImageUpload = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const { selectFile, setSelectedFile, selectedFile } = useSelectFile();

  const handleUpload = () => {
    selectedFileRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageEvent", event);
    selectFile(event);
  };

  const handleImageCancel = () => {
    setSelectedFile("");
  };

  return (
    <div>
      {selectedFile ? (
        <div className="flex flex-col gap-1">
          <Image
            src={selectedFile}
            alt="selectedImage"
            width={300}
            height={200}
            priority={false}
          />
          <Button type="button" secondary onClick={handleImageCancel}>
            cancel
          </Button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={handleUpload}
            className="flex items-center justify-center w-full h-44
            border rounded-md shadow-md gap-1 hover:bg-gray-100"
          >
            <PhotoIcon className="w-6 h-6" />
            <span className="text-sm font-semibold text-gray-600">
              Select Image
            </span>
          </button>
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
