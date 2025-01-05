"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { Label } from "~/components/ui/label";
import { UploadButton } from "~/components/uploadthing";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { Button } from "~/components/ui/button";

export default function CVStep({
  cv,
  setCv,
  setStep,
}: {
  cv: string | undefined;
  setCv: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleUploadComplete = async (res: any) => {
    toast.success("Your file has been uploaded successfully.");
    await updateUser.mutateAsync({
      cv: res[0]?.url,
    });
    setCv(res[0]?.url);
  };

  const handleUploadError = (error: Error) => {
    toast.error(error.name);
    if (error.name === "FileSizeMismatchUploadThingError")
      toast.error("Your file size is too large. The maximum allowed is 4MB.");
    toast.error("There's something wrong, please try again later.");
  };

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "university-year",
      },
    ]);

    setStep("university-year");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      updateSearchParam([
        {
          name: "step",
          value: "review",
        },
      ]);

      setStep("review");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="cv">Upload your CV</Label>
        {cv ? (
          <div className="flex gap-3 items-center py-3">
            <a
              className="text-blue-500 underline"
              href={cv}
              target="_blank"
              rel="noreferrer"
            >
              View uploaded CV
            </a>
            <Button onClick={() => setCv(undefined)}>Upload another</Button>
          </div>
        ) : (
          <UploadButton
            className="ut-button:rounded-xl ut-button:bg-primary ut-button:text-white ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-button:ut-uploading:bg-accent-foreground/30"
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
        )}
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"outline"} type="button">
          Back
        </Button>
        <Button loading={loading} type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  );
}
