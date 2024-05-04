"use client";

import { useState, useEffect } from "react";

export default function DownloadButton({ url }: { url: string }) {
   const [downloadUrl, setDownloadUrl] = useState("");

   useEffect(() => {
      const downloadFile = async () => {
         const response = await fetch(url);
         const blob = await response.blob();
         const blobUrl = URL.createObjectURL(blob);
         setDownloadUrl(blobUrl);
      };

      downloadFile();
   }, [url]);

   return (
      <a href={downloadUrl} download>
         <button className="text-blue-400">Download</button>
      </a>
   );
}
