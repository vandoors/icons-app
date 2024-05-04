"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "../utils/uploadthing";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

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

function LoadingSpinnerSVG() {
   return (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
         />
         <path
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            className="spinner_ajPY"
         />
      </svg>
   );
}

export function SimpleUploadButton() {
   const router = useRouter();
   const { inputProps } = useUploadThingInputProps("iconUploader", {
      onUploadBegin() {
         toast(
            <div className="flex items-center gap-2">
               <LoadingSpinnerSVG />
               <span>Uploading...</span>
            </div>,
            {
               duration: 10000,
               id: "upload-begin",
            },
         );
      },
      onClientUploadComplete: () => {
         toast.dismiss("upload-begin");
         toast("Upload complete", {
            duration: 4000,
         });
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
