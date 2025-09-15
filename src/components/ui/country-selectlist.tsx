"use client";
import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

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
  value?: string;
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
    value,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined
  );

  const controlledValue = value || defaultValue;

  useEffect(() => {
    if (controlledValue) {
      const initialCountry = options.find(
        (country) => country.alpha3 === controlledValue
      );
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      } else {
        setSelectedCountry(undefined);
      }
    } else {
      setSelectedCountry(undefined);
    }
  }, [controlledValue, options]);

  const handleSelect = useCallback(
    (countryAlpha3: string) => {
      const country = options.find((c) => c.alpha3 === countryAlpha3);
      if (country) {
        setSelectedCountry(country);
        onChange?.(country);
        setOpen(false);
      }
    },
    [onChange, options]
  );

  const sortedOptions = options
    .filter(
      (x) =>
        x.name &&
        !!x.alpha3 &&
        x.alpha3.trim().length > 0 &&
        !!x.alpha2 &&
        x.alpha2.trim().length > 0
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <CircleFlag
                  countryCode={selectedCountry.alpha2.toLowerCase()}
                  height={16}
                />
              </div>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountry.name}
              </span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] rounded-none border-black bg-black p-0"
        align="start"
      >
        <Command className="border-none bg-black">
          <CommandInput
            placeholder="Search countries..."
            className="border-none bg-black text-white placeholder:text-zinc-400"
          />
          <CommandEmpty className="text-white">No country found.</CommandEmpty>
          <CommandList className="bg-black">
            <CommandGroup>
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option.alpha3}
                  value={option.name}
                  onSelect={() => handleSelect(option.alpha3)}
                  className="text-white hover:text-black"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      selectedCountry?.alpha3 === option.alpha3
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <CircleFlag
                        countryCode={option.alpha2.toLowerCase()}
                        height={16}
                      />
                    </div>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white">
                      {option.name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountrySelectListComponent.displayName = "CountrySelectListComponent";

export const CountrySelectlist = forwardRef(CountrySelectListComponent);
