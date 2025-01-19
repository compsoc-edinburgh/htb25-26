import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

const items = [
  {
    id: "vegetarian",
    label: "Vegetarian",
  },
  {
    id: "vegan",
    label: "Vegan",
  },
  {
    id: "halal",
    label: "Halal",
  },
  {
    id: "gluten",
    label: "Gluten intolerance",
  },
  {
    id: "lactose",
    label: "Lactose Intolerance",
  },
  {
    id: "peanut",
    label: "Peanut allergy",
  },
];

export default function DietStep({
  diet,
  setDiet,
  setStep,
}: {
  diet?: string;
  setDiet: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(
    diet?.split(",") ?? [],
  );

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "reimbursement",
      },
    ]);

    setStep("reimbursement");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        dietaryRestrictions: diet,
      });

      updateSearchParam([
        {
          name: "step",
          value: "calendar",
        },
      ]);

      setStep("calendar");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="portfolio">Dietary Restrictions</Label>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center gap-2"
            >
              <Checkbox
                id={item.id}
                checked={dietaryRestrictions?.includes(item.id)}
                onCheckedChange={(checked) => {
                  let dr = dietaryRestrictions.filter((i) => i !== "none");

                  if (checked) dr = [...dr, item.id];
                  else dr = dr.filter((i) => i !== item.id);

                  setDietaryRestrictions(dr);
                  setDiet(dr.join(","));
                }}
              />
              {item.label}
            </Label>
          ))}
          <Label htmlFor="none" className="flex items-center gap-2">
            <Checkbox
              id="none"
              checked={dietaryRestrictions?.includes("none")}
              onCheckedChange={(checked) => {
                let dr = dietaryRestrictions.filter((i) => i !== "none");

                if (checked) dr = ["none"];
                else dr = dr.filter((i) => i !== "none");

                setDietaryRestrictions(dr);
                setDiet(dr.join(","));
              }}
            />
            None
          </Label>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"outline"} type="button">
          Back
        </Button>
        <Button loading={loading} type="submit" className="flex-1" disabled={dietaryRestrictions.length === 0 || loading}>
          Next
        </Button>
      </div>
    </form>
  );
}
