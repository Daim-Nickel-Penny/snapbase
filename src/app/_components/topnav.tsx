"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import SimpleUploadButton from "./simple-upload-button";

function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Snapbase</div>

      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* <UploadButton
            endpoint={"imageUploader"}
            onClientUploadComplete={() => {
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          /> */}
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
