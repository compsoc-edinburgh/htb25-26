import {
  Control,
  Controller,
  useWatch,
  type FieldErrors,
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
import { UserFormValues } from "./types";
import { useSignUp, useSignIn, useClerk, useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { Loader2, CheckCircle2 } from "lucide-react";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "msc", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
];

interface YourUniversityProps {
  control: Control<any>;
  register: any;
  getValues: any;
  setValue: (name: keyof UserFormValues, value: any) => void;
  errors: FieldErrors<UserFormValues>;
  disabled?: boolean;
  onSubmitUser?: (values: UserFormValues) => Promise<void> | void;
}

export const YourUniversity = ({
  control,
  register,
  getValues,
  setValue,
  errors,
  disabled,
  onSubmitUser,
}: YourUniversityProps) => {
  const { user, isSignedIn } = useUser();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { setActive } = useClerk();

  const userGet = api.user.get.useQuery(undefined, { enabled: false });

  const [otpSent, setOtpSent] = useState(false);
  const [code, setCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | undefined>();
  const [verified, setVerified] = useState(false);
  const [authFlow, setAuthFlow] = useState<"signup" | "signin" | null>(null);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

  const selectedCountryAlpha3 = useWatch({ control, name: "countryAlpha3" });
  const selectedUniversityName = useWatch({ control, name: "universityName" });
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

  const requiredUserValid = Boolean(
    getValues("countryAlpha3") &&
      getValues("universityName") &&
      getValues("universityYear") &&
      getValues("universityEmail")
  );
  
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
          <Input
            type="email"
            placeholder={isSignedIn ? user.primaryEmailAddress : "john.doe@university.ac.uk"}
            disabled={!selectedUniversityName || isSignedIn || disabled}
            {...register("universityEmail")}
          />
          {!isSignedIn && !disabled && (
            <Button
              type="button"
              onClick={async () => {
                setVerifyError(undefined);
                const email = getValues("universityEmail");
                if (!email) {
                  setVerifyError("Enter your university email first");
                  return;
                }

                // Validate uni email
                const emailDomain = email.split("@")[1];
                if (!emailDomain) {
                  setVerifyError("Enter a valid email address");
                  return;
                }

                const selectedUni = universities.find(
                  (u) => u.name === selectedUniversityName
                );
                
                if (selectedUni && selectedUni.domains) {
                  const domainMatches = selectedUni.domains.some((domain) => 
                    emailDomain.toLowerCase() === domain.toLowerCase() ||
                    emailDomain.toLowerCase().endsWith('.' + domain.toLowerCase())
                  );
                  
                  if (!domainMatches) {
                    setVerifyError(
                      `Email domain must match your university. Expected: ${selectedUni.domains.join(', ')}`
                    );
                    return;
                  }
                }

                setIsSendingCode(true);
                try {
                  if (!isSignUpLoaded || !isSignInLoaded) {
                    throw new Error("Auth not ready yet, try again");
                  }

                  try {
                    await signUp?.create({ emailAddress: email });
                    await signUp?.prepareEmailAddressVerification({
                      strategy: "email_code",
                    });
                    setAuthFlow("signup");
                    setOtpSent(true);
                  } catch (err: any) {
                    const attempt = await signIn?.create({ identifier: email });
                    const emailFactor: any =
                      attempt?.supportedFirstFactors?.find(
                        (f: any) => f.strategy === "email_code"
                      );
                    const emailAddressId = emailFactor?.emailAddressId;
                    if (!emailAddressId)
                      throw new Error("Email factor unavailable");
                    await signIn?.prepareFirstFactor({
                      strategy: "email_code",
                      emailAddressId,
                    });
                    setAuthFlow("signin");
                    setOtpSent(true);
                  }
                  setCooldownTimeLeft(30);
                } catch (err: any) {
                  const message =
                    err?.errors?.[0]?.message ||
                    err?.message ||
                    "Failed to send code";
                  setVerifyError(message);
                } finally {
                  setIsSendingCode(false);
                }
              }}
              disabled={
                !selectedUniversityName || !requiredUserValid || isVerifying || cooldownTimeLeft > 0
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
        {!isSignedIn && otpSent && !disabled && (
          <div className="mt-2 flex items-center gap-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="max-w-[200px]"
            />
            <Button
              type="button"
              onClick={async () => {
                setVerifyError(undefined);
                setIsVerifying(true);
                try {
                  let result: any;
                  if (authFlow === "signup") {
                    result = await signUp?.attemptEmailAddressVerification({
                      code,
                    });
                  } else {
                    result = await signIn?.attemptFirstFactor({
                      strategy: "email_code",
                      code,
                    });
                  }

                  if (result?.status === "complete") {
                    await setActive({ session: result.createdSessionId });
                    await userGet.refetch();
                    const v = getValues();
                    if (onSubmitUser) {
                      await onSubmitUser(v as UserFormValues);
                    }
                    setVerified(true);
                  } else {
                    setVerifyError("Invalid code. Please try again.");
                  }
                } catch (err: any) {
                  const message =
                    err?.errors?.[0]?.message ||
                    err?.message ||
                    "Verification failed";
                  setVerifyError(message);
                } finally {
                  setIsVerifying(false);
                }
              }}
              disabled={!code || isVerifying || code.length < 6}
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying
                </span>
              ) : (
                "Submit code"
              )}
            </Button>
            {verified && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-4 w-4" /> Verified
              </span>
            )}
          </div>
        )}
        {verifyError && <p className="text-sm text-red-600">{verifyError}</p>}
      </div>
    </div>
  );
};
