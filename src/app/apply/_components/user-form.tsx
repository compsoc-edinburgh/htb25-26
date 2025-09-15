"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormPersist } from "use-react-hook-form-persist";
import { toast } from "sonner";
import { AboutYourself, YourUniversity } from "../_steps";
import { AccordionSection } from "./accordion";
import { api } from "~/trpc/react";
import { countries } from "country-data-list";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { UserFormSchema, type UserFormValues } from "../_steps/types";

export default function UserForm() {
  const { isSignedIn, user } = useUser();
  const updateUser = api.user.update.useMutation();

  const form = useFormPersist(
    useForm<UserFormValues>({
      resolver: zodResolver(UserFormSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        pronouns: "",
        countryAlpha3: "GBR",
        universityName: "",
        universityYear: "",
        universityEmail: "",
      },
      mode: "onChange",
    }),
    { key: "apply-user-form" }
  );

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(["about-yourself"])
  );
  const toggle = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const onSubmit = async (values: UserFormValues) => {
    try {
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
          success: "Information saved successfully!",
          error: "Failed to save information. Please try again.",
        }
      );

      setExpanded(new Set());
    } catch (error) {
      console.error("Failed to update user information:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const disabled = !!isSignedIn;
  const isLoading = updateUser.isPending;

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
          register={form.register}
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
          onSubmitUser={onSubmit}
        />
      </AccordionSection>
    </form>
  );
}
