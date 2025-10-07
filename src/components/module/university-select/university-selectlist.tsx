"use client";
import React, { forwardRef, useState, useCallback, useEffect } from "react";
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
  value?: string;
  disabled?: boolean;
  placeholder?: string;
}

const UniversitySelectlistComponent = (
  {
    options = universities,
    onChange,
    defaultValue,
    value,
    disabled = false,
    placeholder = "Select a university",
  }: UniversityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<
    University | undefined
  >(undefined);

  const controlledValue = value || defaultValue;

  useEffect(() => {
    if (controlledValue) {
      const initialUniversity = options.find(
        (university) => university.name === controlledValue
      );
      if (initialUniversity) {
        setSelectedUniversity(initialUniversity);
      } else {
        setSelectedUniversity(undefined);
      }
    } else {
      setSelectedUniversity(undefined);
    }
  }, [controlledValue, options]);

  const handleSelect = useCallback(
    (universityName: string) => {
      const university = options.find((u) => u.name === universityName);
      if (university) {
        setSelectedUniversity(university);
        onChange?.(university);
        setOpen(false);
      }
    },
    [onChange, options]
  );

  const sortedOptions = options
    .filter((x) => x.name)
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
          {selectedUniversity ? (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedUniversity.name}
            </span>
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
            placeholder="Search universities..."
            className="border-none bg-black text-white placeholder:text-zinc-400"
          />
          <CommandEmpty className="text-white">
            No university found.
          </CommandEmpty>
          <CommandList className="bg-black">
            <CommandGroup>
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option.name}
                  value={option.name}
                  onSelect={() => handleSelect(option.name)}
                  className="text-white hover:bg-zinc-800 data-[selected]:bg-zinc-800"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-white",
                      selectedUniversity?.name === option.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-white">
                    {option.name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

UniversitySelectlistComponent.displayName = "UniversitySelectlistComponent";

export const UniversitySelectlist = forwardRef(UniversitySelectlistComponent);
