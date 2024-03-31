import React, { useEffect, useState } from "react";
import UploadImageIcon from "@/components/icons/UploadImageIcon";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList | null;
  };
}

export default function AddImages() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    previewImages.length > 6 && setPreviewImages(previewImages.slice(0, 6));
  }, [previewImages]);

  const handleImageChange = (event: FileChangeEvent) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prevImages) => [
            ...prevImages,
            reader.result as string,
          ]);
        };
        reader.readAsDataURL(file);
        return reader;
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Pictures</h1>
      <div className="flex flex-row overflow-auto gap-4 relative">
        <input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          required
          className="w-20 h-44 absolute z-10 opacity-20"
        />
        <label
          htmlFor="productImages"
          className="min-w-20 w-20 h-44 z-20 flex items-center justify-center text-center font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          <UploadImageIcon className="" />
        </label>
        {previewImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Product Preview ${index + 1}`}
            className=" h-44"
          />
        ))}
      </div>
      {previewImages.length > 0 && (
        <span>
          ({previewImages.length}) selected (you can add{" "}
          {6 - previewImages.length} more)
        </span>
      )}
    </div>
  );
}
