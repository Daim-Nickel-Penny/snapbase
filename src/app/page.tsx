import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((img) => (
        <div key={img.id} className="flex w-48 flex-col">
          <img src={img.url} alt="images" />
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
