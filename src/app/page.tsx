import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
   "https://utfs.io/f/220dd34e-cc8d-4ba8-97f4-1f55a8cb8860-a1adse.png",
   "https://utfs.io/f/6f233f42-7b09-4d13-9d68-22d72dda86aa-l9e435.png",
   "https://utfs.io/f/b67247a4-7677-4361-b41f-0e25b5e164a3-g8ugpz.png",
   "https://utfs.io/f/bfe48c6b-30ae-4d73-a99d-24eb5f1fb9b1-x303lg.png",
   "https://utfs.io/f/a06fe2c0-431b-419f-b70c-473aa6747d26-env36t.png",
   "https://utfs.io/f/25603709-f28b-4f39-a309-03721e2a846b-5v1lbw.png",
   "https://utfs.io/f/107a20a7-8187-407d-aa6a-d2aac1834731-l8ppst.png",
   "https://utfs.io/f/a1e03d7a-c628-4bde-a8c3-16c849cbea93-vgcofm.png",
   "https://utfs.io/f/14dd84ce-5dae-4a33-beb4-782f1d99be79-rc5eb8.png",
   "https://utfs.io/f/e30e8da9-df47-48e1-825c-907674fe258b-myk93r.png",
];

const mockImages = mockUrls.map((url, index) => ({
   id: index + 1,
   url,
}));

export default async function HomePage() {
   const posts = await db.query.posts.findMany();
   console.log(posts);
   return (
      <main>
         <div className="flex flex-wrap gap-4">
            {posts.map((post) => (
               <div>{post.name}</div>
            ))}
            {[...mockImages, ...mockImages, ...mockImages].map(
               (image, index) => (
                  <div key={image.id + "-" + index} className="w-48">
                     <img src={image.url} />
                  </div>
               ),
            )}
         </div>
      </main>
   );
}
