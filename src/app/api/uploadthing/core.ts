import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const user = await auth();

        //if (!user.userId) throw new UploadThingError("Unauthorized");

        if (!user.userId) throw new Error("Unauthorized");

        console.log("middleware called");
        return { userId: user.userId };
      } catch (e) {
        //@ts-expect-error ignore
        console.log(e.message, e.stack);
        throw new Error("error in catch");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId);
      // console.log("file", JSON.stringify(file));
      // console.log("file url", file.url);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
