"use client";
import React, { forwardRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import universities from "~/lib/constants/world_universities_and_domains.json";

export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

interface UniversityDropdownProps {
  options?: University[];
  onChange?: (university: University) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
}

const UniversitySelectlistComponent = (
  {
    options = universities,
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a university",
  }: UniversityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => {
        const uni = options.find((u) => u.name === value);
        if (uni) onChange?.(uni);
      }}
      disabled={disabled}
    >
      <SelectTrigger ref={ref}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-none border-0">
        <SelectGroup>
          {options
            .filter((x) => x.name)
            .map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

UniversitySelectlistComponent.displayName = "UniversitySelectlistComponent";

export const UniversitySelectlist = forwardRef(UniversitySelectlistComponent);
