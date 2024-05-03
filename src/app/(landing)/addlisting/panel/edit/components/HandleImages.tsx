import React, { useEffect, SetStateAction, Dispatch } from "react";
import UploadImageIcon from "@/components/icons/UploadImageIcon";
import TrashBin from "@/components/icons/TrashBin";
// import FormStateError from "../utils/FormStateError";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList | null;
  };
}

type Props = {
  //   formState: creationFromStatus;
  //   formError: number;
  previewImages: string[];
  setPreviewImages: Dispatch<SetStateAction<string[]>>;
};

export default function HandleImages({
  //   formError,
  //   formState,
  previewImages,
  setPreviewImages,
}: Props) {
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

  const removeImage = (index: number) => {
    setPreviewImages((prev) => {
      const filteredImages = prev.filter((_, i) => i !== index);
      return filteredImages;
    });
  };

  return (
    <div id="imagesSection" className="relative">
      <div className="flex flex-row transition-all items-center overflow-auto gap-4 relative scrollbar-container">
        <input
          type="file"
          id="productImages"
          name="productImages"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
          multiple
          className="w-40 h-40 absolute opacity-0"
        />
        <label
          htmlFor="productImages"
          className="min-w-40 h-40 z-20 flex items-center justify-center font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          <UploadImageIcon className="w-10 h-10" />
        </label>
        <div className="flex gap-4 h-full transition-all">
          {previewImages.map((imageUrl, index) => (
            <div
              className="flex h-44 items-center transition-all justify-center flex-shrink-0 relative"
              key={index}
            >
              <img
                key={index}
                src={imageUrl}
                alt={`Product Preview ${index + 1}`}
                className="h-[95%]  rounded-sm"
              />
              <div className="absolute z-20 w-[30%] h-[95%] right-0 bg-black/50">
                <div className="flex z-30 h-full w-full items-center justify-center">
                  <TrashBin
                    onClick={() => removeImage(index)}
                    className="text-red-500 cursor-pointer transition-all hover:-translate-y-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {previewImages.length > 0 && (
        <span>
          ({previewImages.length}) selected (you can add{" "}
          {6 - previewImages.length} more)
        </span>
      )}
      {/* {formError === 22 && (
        <div className="mt-4 relative">
          <FormStateError formState={formState} />
        </div>
      )} */}
    </div>
  );
}
