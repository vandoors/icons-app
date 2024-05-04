"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "../utils/uploadthing";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
   const $ut = useUploadThing(...args);

   const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const selectedFiles = Array.from(e.target.files);
      const result = await $ut.startUpload(selectedFiles);

      console.log("uploaded files", result);
      // TODO: persist result in state maybe?
   };

   return {
      inputProps: {
         onChange,
         multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
         accept: "image/*",
      },
      isUploading: $ut.isUploading,
   };
};

export function SimpleUploadButton() {
   const router = useRouter();
   const { inputProps } = useUploadThingInputProps("iconUploader", {
      onClientUploadComplete: () => {
         router.refresh();
      },
   });

   return (
      <div>
         <label htmlFor="upload-button" className="">
            <div className="cursor-pointer rounded-full bg-stone-800 bg-opacity-5 p-4 transition-all ease-in-out hover:bg-opacity-15">
               <ArrowUpOnSquareStackIcon className="h-6 w-6" />
            </div>
         </label>
         <input
            id="upload-button"
            type="file"
            className="sr-only"
            {...inputProps}
         />
      </div>
   );
}
