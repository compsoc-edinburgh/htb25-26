"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { UploadButton, UploadDropzone } from "~/components/uploadthing";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { Button } from "~/components/ui/button";
import { Check, ExternalLink } from "lucide-react";

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
  const [uploaded, setUploaded] = useState(!!cv);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleUploadComplete = async (res: any) => {
    toast.success("Your file has been uploaded successfully.");
    await updateUser.mutateAsync({
      cv: res[0]?.url,
    });
    setCv(res[0]?.url);
    setUploaded(true);
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
        value: "email",
      },
    ]);

    setStep("email");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      updateSearchParam([
        {
          name: "step",
          value: "portfolio",
        },
      ]);

      setStep("portfolio");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-3"
    >
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Your CV</h2>
        <p className="font-sans text-sm text-muted-foreground">
          Upload your most recent CV as a PDF or image file up to 2MB.
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {cv && (
          <>
            <p className="flex items-center gap-2 py-3">
              <Check size={22} /> Successfully uploaded your CV{" "}
            </p>
            <div className="flex items-center gap-3">
              <Button asChild className="flex-1">
                <a href={cv} target="_blank" rel="noreferrer">
                  View uploaded CV <ExternalLink />
                </a>
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setUploaded(false)}
              >
                Change
              </Button>
            </div>
          </>
        )}
        {!uploaded && (
          <div>
            {cv ? (
              <>
                <p className="my-6 text-center">Upload another CV to replace</p>
                <div className="flex flex-col items-center justify-center gap-3">
                  <UploadButton
                    className="ut-button:rounded-xl ut-button:bg-primary ut-button:text-primary-foreground ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-label:hover:text-primary ut-button:ut-uploading:bg-accent-foreground/30"
                    endpoint="pdfUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                  />
                  <div className="flex h-full justify-end">
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setUploaded(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <UploadDropzone
                className="ut-button:rounded-xl ut-button:bg-primary ut-button:text-primary-foreground ut-button:transition-colors ut-button:after:bg-primary ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-label:hover:text-primary ut-button:ut-uploading:bg-accent-foreground/30"
                endpoint="pdfUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
            )}
          </div>
        )}
      </div>
      <p className="text-center font-sans text-xs my-3">
        By continuing, you consent to us sharing your CV 
         and all other information with event sponsors.
      </p>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={loading || !cv}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
