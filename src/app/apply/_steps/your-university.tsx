import {
  Control,
  Controller,
  useWatch,
  type FieldErrors,
  type UseFormRegister,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Country, CountrySelectlist } from "~/components/ui/country-selectlist";
import {
  University,
  UniversitySelectlist,
} from "~/components/ui/university-selectlist";
import universities from "~/lib/constants/world_universities_and_domains.json";
import { countries } from "country-data-list";
import { UserFormValues, UserFormSchema } from "./types";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "msc", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
];

interface YourUniversityProps {
  control: Control<UserFormValues>;
  register: UseFormRegister<UserFormValues>;
  getValues: UseFormGetValues<UserFormValues>;
  setValue: UseFormSetValue<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  disabled?: boolean;
  sendVerificationCode: () => Promise<boolean>;
  onSubmit: () => void;
}

export const YourUniversity = ({
  control,
  register,
  getValues,
  setValue,
  errors,
  disabled,
  sendVerificationCode,
  onSubmit,
}: YourUniversityProps) => {
  const { user, isSignedIn } = useUser();

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

  const selectedCountryAlpha3 = useWatch({ control, name: "countryAlpha3" });
  const selectedUniversityName = useWatch({ control, name: "universityName" });
  const universityEmail = useWatch({ control, name: "universityEmail" });
  const codeSent = useWatch({ control, name: "codeSent" });
  const verificationCode = useWatch({ control, name: "verificationCode" });

  const selectedCountryAlpha2 = countries.all.find(
    (c: any) => c.alpha3 === selectedCountryAlpha3
  )?.alpha2;

  useEffect(() => {
    setValue("universityName", "");
  }, [selectedCountryAlpha2, setValue]);

  useEffect(() => {
    setValue("universityYear", "");
    setValue("universityEmail", "");
  }, [selectedUniversityName, setValue]);

  const emailValid = (() => {
    if (!universityEmail || universityEmail.trim() === "") return false;
    try {
      UserFormSchema.shape.universityEmail.parse(universityEmail);
      return true;
    } catch {
      return false;
    }
  })();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTimeLeft > 0) {
      interval = setInterval(() => {
        setCooldownTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTimeLeft]);

  return (
    <div className="grid gap-6">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Where is your university based? *
          </Label>
        </div>
        <Controller
          control={control}
          name="countryAlpha3"
          render={({ field }) => (
            <CountrySelectlist
              value={field.value}
              onChange={(c: Country) => field.onChange(c.alpha3)}
            />
          )}
        />
        {errors.countryAlpha3?.message && (
          <p className="text-sm text-red-600">
            {String(errors.countryAlpha3.message)}
          </p>
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Your university *</Label>
        </div>
        <Controller
          control={control}
          name="universityName"
          render={({ field }) => (
            <UniversitySelectlist
              key={selectedCountryAlpha2 || "none"}
              options={universities.filter(
                (u) => u.alpha_two_code === selectedCountryAlpha2
              )}
              value={field.value}
              onChange={(u: University) => field.onChange(u.name)}
              disabled={!selectedCountryAlpha3 || disabled}
            />
          )}
        />
        {errors.universityName?.message && (
          <p className="text-sm text-red-600">
            {String(errors.universityName.message)}
          </p>
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Which year are you in? *</Label>
        </div>
        <Controller
          control={control}
          name="universityYear"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedUniversityName || disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.universityYear?.message && (
          <p className="text-sm text-red-600">
            {String(errors.universityYear.message)}
          </p>
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">University email *</Label>
        </div>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="universityEmail"
            render={({ field }) => (
              <Input
                type="email"
                placeholder={
                  isSignedIn
                    ? (user?.primaryEmailAddress?.emailAddress ?? undefined)
                    : "john.doe@university.ac.uk"
                }
                disabled={!selectedUniversityName || isSignedIn || disabled}
                {...field}
                onInput={(e) => {
                  // Handle autofill detection
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  // Trigger validation on blur (for autofill)
                  field.onBlur();
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          {!isSignedIn && !disabled && (
            <Button
              type="button"
              onClick={async () => {
                // Validate email using schema before sending code
                if (!universityEmail || universityEmail.trim() === "") {
                  toast.error("Please enter your university email first");
                  return;
                }

                try {
                  UserFormSchema.shape.universityEmail.parse(universityEmail);
                } catch (error: any) {
                  const errorMessage =
                    error?.issues?.[0]?.message ||
                    "Please enter a valid university email address";
                  toast.error(errorMessage);
                  return;
                }

                const selectedUni = universities.find(
                  (u) => u.name === selectedUniversityName
                );

                if (selectedUni && selectedUni.domains) {
                  const emailDomain = universityEmail.split("@")[1];
                  const domainMatches = selectedUni.domains.some(
                    (domain) =>
                      emailDomain?.toLowerCase() === domain.toLowerCase() ||
                      emailDomain
                        ?.toLowerCase()
                        .endsWith("." + domain.toLowerCase())
                  );

                  if (!domainMatches) {
                    toast.error(
                      `Email domain must match your university. Expected: ${selectedUni.domains.join(", ")}`
                    );
                    return;
                  }
                }

                setIsSendingCode(true);
                const success = await sendVerificationCode();
                if (success) {
                  setCooldownTimeLeft(30);
                }
                setIsSendingCode(false);
              }}
              disabled={
                !selectedUniversityName ||
                !emailValid ||
                isSendingCode ||
                cooldownTimeLeft > 0
              }
              className="whitespace-nowrap"
            >
              {isSendingCode ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending code
                </span>
              ) : cooldownTimeLeft > 0 ? (
                `Wait ${cooldownTimeLeft}s`
              ) : (
                "Get code"
              )}
            </Button>
          )}
        </div>
        {errors.universityEmail?.message && (
          <p className="text-sm text-red-600">
            {String(errors.universityEmail.message)}
          </p>
        )}
        {!isSignedIn && codeSent && !disabled && (
          <div className="mt-2 space-y-14">
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="verificationCode"
                render={({ field }) => (
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    {...field}
                    className="max-w-[200px]"
                  />
                )}
              />
              <p className="text-sm text-gray-600">
                Enter the 6-digit code sent to your email
              </p>
            </div>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!verificationCode || verificationCode.length < 6}
              className="h-10 px-6 text-sm"
            >
              Create Account & Submit
            </Button>
          </div>
        )}
        {errors.verificationCode?.message && (
          <p className="text-sm text-red-600">
            {String(errors.verificationCode.message)}
          </p>
        )}
      </div>
    </div>
  );
};
