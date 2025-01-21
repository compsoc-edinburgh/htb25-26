"use client";
import React, {
  useCallback,
  useState,
  forwardRef,
  useEffect,
  useRef,
} from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
// utils
import { cn } from "~/lib/utils";

// assets
import { ChevronDown, CheckIcon, Globe } from "lucide-react";
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
      (country: Country) => country.emoji && country.status !== "deleted",
    ),
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  );
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = options.find(
        (country) => country.alpha3 === defaultValue,
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
        // Scroll the selected into view, as it may be invisible
        setTimeout(() => {
          if (selectedRef.current) {
            selectedRef.current.scrollIntoView({
              block: "center",
              behavior: "instant",
            });
          }
        }, 100);
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
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country);
    },
    [onChange],
  );

  return (
    <Command className="w-full bg-transparent">
      <div className="sticky top-0 z-10">
        <CommandInput placeholder="Search country..." />
      </div>
      <CommandList>
        <CommandEmpty>No country found.</CommandEmpty>
        <CommandGroup className="">
          {options
            .filter((x) => x.name)
            .map((option, key: number) => (
              <CommandItem
                className={cn(
                  "my-1 flex w-full items-center gap-2 rounded-xl p-3 transition-colors",
                  option.name === selectedCountry?.name
                    ? "bg-accent-yellow data-[selected=true]:bg-accent-yellow text-black data-[selected=true]:text-black"
                    : "hover:bg-primary-50",
                )}
                ref={option.alpha3 === defaultValue ? selectedRef : null}
                key={key}
                onSelect={() => handleSelect(option)}
              >
                <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                  <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <CircleFlag
                      countryCode={option.alpha2.toLowerCase()}
                      height={20}
                    />
                  </div>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.name}
                  </span>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4 shrink-0",
                    option.name === selectedCountry?.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

CountrySelectListComponent.displayName = "CountrySelectListComponent";

export const CountrySelectlist = forwardRef(CountrySelectListComponent);
