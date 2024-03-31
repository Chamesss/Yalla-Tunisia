import React, { useEffect, useState } from "react";
import UploadImageIcon from "@/components/icons/UploadImageIcon";
import TrashBin from "@/components/icons/TrashBin";

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
      <div className="flex flex-row justify-center items-center overflow-auto gap-4 relative">
        <input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          required
          className="w-40 h-40 absolute opacity-0"
        />
        <div className="h-full">
          <label
            htmlFor="productImages"
            className="min-w-40 h-40 flex items-center justify-center font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            <UploadImageIcon className="w-10 h-10" />
          </label>
        </div>
        <div className="flex gap-4 h-full">
          {previewImages.map((imageUrl, index) => (
            <>
              <div className="flex relative">
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product Preview ${index + 1}`}
                  className="h-44 rounded-sm"
                />
                <div className="absolute z-20 w-[30%] h-full right-0 bg-black/50">
                  <div className="flex z-30 h-full w-full items-center justify-center">
                    <TrashBin className="text-red-500 cursor-pointer transition-all hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
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
