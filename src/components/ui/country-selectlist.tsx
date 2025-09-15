"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// assets
import { CircleFlag } from "react-circle-flags";

// data
import { countries } from "country-data-list";

// Country interface
export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

// Dropdown props
interface CountryDropdownProps {
  options?: Country[];
  onChange?: (country: Country) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

const CountrySelectListComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji &&
        country.status !== "deleted" &&
        !!country.alpha3 &&
        country.alpha3.trim().length > 0 &&
        !!country.alpha2 &&
        country.alpha2.trim().length > 0
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => country.alpha3 === defaultValue
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        // Reset selected country if defaultValue is not found
        setSelectedCountry(undefined);
      }
    } else {
      // Reset selected country if defaultValue is undefined or null
      setSelectedCountry(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (countryAlpha3: string) => {
      const country = options.find((c) => c.alpha3 === countryAlpha3);
      if (country) {
        setSelectedCountry(country);
        onChange?.(country);
      }
    },
    [onChange, options]
  );

  return (
    <Select
      value={defaultValue}
      onValueChange={handleSelect}
      disabled={disabled}
    >
      <SelectTrigger ref={ref} className="w-full">
        <SelectValue placeholder={placeholder}>
          {selectedCountry && (
            <div className="flex items-center gap-2">
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <CircleFlag
                  countryCode={selectedCountry.alpha2.toLowerCase()}
                  height={20}
                />
              </div>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options
            .filter(
              (x) =>
                x.name &&
                !!x.alpha3 &&
                x.alpha3.trim().length > 0 &&
                !!x.alpha2 &&
                x.alpha2.trim().length > 0
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((option, key: number) => (
              <SelectItem key={key} value={option.alpha3}>
                <div className="flex items-center gap-2">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <CircleFlag
                      countryCode={option.alpha2.toLowerCase()}
                      height={20}
                    />
                  </div>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.name}
                  </span>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

CountrySelectListComponent.displayName = "CountrySelectListComponent";

export const CountrySelectlist = forwardRef(CountrySelectListComponent);
