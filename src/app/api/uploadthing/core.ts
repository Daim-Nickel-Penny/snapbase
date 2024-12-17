import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 5,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      try {
        // This code runs on your server before upload
        const user = await auth();

        //if (!user.userId) throw new UploadThingError("Unauthorized");

        if (!user.userId) throw new Error("Unauthorized");

        console.log("middleware called");
        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId: user.userId };
      } catch (e) {
        //@ts-expect-error ignore
        console.log(e.message, e.stack);
        throw new Error("error in catch");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);
      // console.log("file", JSON.stringify(file));
      // console.log("file url", file.url);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
