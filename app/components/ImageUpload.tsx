"use client";

import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface ImageUploadProps {
  selectedFile: string | undefined;
  setSelectedFile: Dispatch<SetStateAction<string | undefined>>;
  selectFile: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, setSelectedFile, selectFile }) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

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
        <div className="flex flex-col items-center gap-1">
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
