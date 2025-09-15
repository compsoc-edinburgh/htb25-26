"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AboutYourself, YourUniversity } from "../_steps";
import { AccordionSection } from "./accordion";
import { api } from "~/trpc/react";
import { countries } from "country-data-list";
import {
  useUser,
  SignInButton,
  SignOutButton,
  useSignUp,
  useSignIn,
  useClerk,
} from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { UserFormSchema, type UserFormValues } from "../_steps/types";

export default function UserForm() {
  const { isSignedIn, user } = useUser();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { setActive } = useClerk();
  const updateUser = api.user.update.useMutation();
  const userGet = api.user.get.useQuery(undefined, { enabled: false });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      pronouns: "",
      countryAlpha3: "GBR",
      universityName: "",
      universityYear: "",
      universityEmail: "",
      verificationCode: "",
      codeSent: false,
      authFlow: undefined,
    },
    mode: "all",
  });

  const [expanded, setExpanded] = useState<Set<string>>(new Set([]));
  const toggle = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (isSignedIn) {
        const selectedCountry = countries.all.find(
          (c: any) => c.alpha3 === values.countryAlpha3
        );

        await toast.promise(
          updateUser.mutateAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            country: selectedCountry?.alpha2,
            university: values.universityName,
            universityYear: values.universityYear,
            universityEmail: values.universityEmail,
            pronouns: values.pronouns,
          }),
          {
            loading: "Saving your information...",
            success:
              "Information saved successfully! You can now proceed to apply.",
            error: "Failed to save information. Please try again.",
          }
        );
        return;
      }

      if (!values.codeSent) {
        toast.error(
          "Please send a verification code first by clicking 'Get code'"
        );
        return;
      }

      if (!values.verificationCode || values.verificationCode.length < 6) {
        toast.error("Please enter the 6-digit verification code");
        return;
      }

      await toast.promise(
        (async () => {
          let result: any;
          if (values.authFlow === "signup") {
            result = await signUp?.attemptEmailAddressVerification({
              code: values.verificationCode!,
            });
          } else {
            result = await signIn?.attemptFirstFactor({
              strategy: "email_code",
              code: values.verificationCode!,
            });
          }

          if (result?.status !== "complete") {
            throw new Error("Invalid verification code");
          }

          await setActive({ session: result.createdSessionId });
          await userGet.refetch();

          const selectedCountry = countries.all.find(
            (c: any) => c.alpha3 === values.countryAlpha3
          );

          await updateUser.mutateAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            country: selectedCountry?.alpha2,
            university: values.universityName,
            universityYear: values.universityYear,
            universityEmail: values.universityEmail,
            pronouns: values.pronouns,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })(),
        {
          loading: "Verifying code and creating account...",
          success:
            "Account created successfully! You can now proceed to apply.",
          error: "Verification failed. Please check your code and try again.",
        }
      );
    } catch (error) {
      console.error("Failed to process form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setExpanded(new Set());
    }
  };

  const disabled = !!isSignedIn;
  const isLoading = updateUser.isPending;

  const sendVerificationCode = async () => {
    const values = form.getValues();
    const email = values.universityEmail;

    if (!email) {
      toast.error("Enter your university email first");
      return false;
    }

    try {
      if (!isSignUpLoaded || !isSignInLoaded) {
        throw new Error("Auth not ready yet, try again");
      }

      try {
        await signUp?.create({ emailAddress: email });
        await signUp?.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        form.setValue("authFlow", "signup");
      } catch (err: any) {
        const attempt = await signIn?.create({ identifier: email });
        const emailFactor: any = attempt?.supportedFirstFactors?.find(
          (f: any) => f.strategy === "email_code"
        );
        const emailAddressId = emailFactor?.emailAddressId;
        if (!emailAddressId) throw new Error("Email factor unavailable");
        await signIn?.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });
        form.setValue("authFlow", "signin");
      }

      form.setValue("codeSent", true);
      toast.success("Verification code sent to your email!");
      return true;
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message || err?.message || "Failed to send code";
      toast.error(message);
      return false;
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full divide-y divide-zinc-200"
    >
      <div className="bg-white p-8 md:p-10 lg:p-12">
        <p className="mt-2 font-whyte text-xl font-bold">User</p>
        {!isSignedIn ? (
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-zinc-600">Already applied?</span>
            <SignInButton mode="modal" signUpForceRedirectUrl="/apply">
              <Button type="button" variant="secondary" size="sm">
                Sign in
              </Button>
            </SignInButton>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-zinc-600">
              Signed in as:{" "}
              <span className="font-medium underline">
                {user?.primaryEmailAddress?.emailAddress ||
                  user?.emailAddresses?.[0]?.emailAddress ||
                  "Unknown"}
              </span>
            </span>
            <SignOutButton signOutOptions={{ redirectUrl: "/apply" }}>
              <Button type="button" variant="secondary" size="sm">
                Sign out
              </Button>
            </SignOutButton>
          </div>
        )}
      </div>
      <AccordionSection
        id="about-yourself"
        title="ABOUT YOURSELF"
        questionsCount={3}
        disabled={disabled || isLoading}
        expanded={expanded.has("about-yourself")}
        onToggle={toggle}
      >
        <AboutYourself
          control={form.control}
          errors={form.formState.errors}
          disabled={disabled || isLoading}
        />
      </AccordionSection>
      <AccordionSection
        id="your-university"
        title="YOUR UNIVERSITY"
        questionsCount={4}
        disabled={disabled || isLoading}
        expanded={expanded.has("your-university")}
        onToggle={toggle}
      >
        <YourUniversity
          control={form.control}
          register={form.register}
          getValues={form.getValues}
          setValue={form.setValue}
          errors={form.formState.errors}
          disabled={disabled || isLoading}
          sendVerificationCode={sendVerificationCode}
          onSubmit={() => form.handleSubmit(onSubmit)()}
        />
      </AccordionSection>
    </form>
  );
}
