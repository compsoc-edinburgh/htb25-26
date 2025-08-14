import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Command, CommandItem, CommandList } from "~/components/ui/command";
import { cn } from "~/lib/utils";

const options = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4+",
    label: "4 or more",
  },
];

export default function PlacementsStep({
  placements,
  setPlacements,
  setStep,
}: {
  placements?: string;
  setPlacements: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "portfolio",
      },
    ]);

    setStep("portfolio");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        placementsCount: placements,
      });

      updateSearchParam([
        {
          name: "step",
          value: "hackathons",
        },
      ]);

      setStep("hackathons");
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
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-muted p-4">
          <h2 className="text-xl font-medium">Work experience</h2>
          <p className="font-sans text-sm text-muted-foreground">
            How many tech internships/placements have you completed since
            beginning university?
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <Command
          className="w-full bg-transparent p-0"
          defaultValue={placements}
        >
          <CommandList>
            {options.map((option, key) => (
              <CommandItem
                className={cn(
                  "my-1 flex w-full items-center gap-2 rounded-xl p-3 transition-colors",
                  option.value === placements
                    ? "bg-accent-yellow text-black data-[selected=true]:bg-accent-yellow data-[selected=true]:text-black"
                    : "hover:bg-primary-50"
                )}
                key={key}
                onSelect={() => setPlacements(option.value)}
              >
                <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.label}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={loading || !placements}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
