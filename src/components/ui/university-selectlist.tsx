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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

// utils
import { cn } from "~/lib/utils";

// assets
import { ChevronDown, CheckIcon, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

// data
import universities from "~/lib/constants/world_universities_and_domains.json";

// Country interface
export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  "state-province": string | null;
}

// Dropdown props
interface UniversityDropdownProps {
  options?: University[];
  onChange?: (university: University) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
}

const UniversitySelectlistComponent = (
  {
    options = universities,
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select a university",
    ...props
  }: UniversityDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [selectedUniversity, setSelectedUniversity] = useState<
    University | undefined
  >(undefined);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      const initialUniversity = options.find(
        (university) => university.name === defaultValue
      );
      if (initialUniversity) {
        setSelectedUniversity(initialUniversity);
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
        setSelectedUniversity(undefined);
      }
    } else {
      // Reset selected country if defaultValue is undefined or null
      setSelectedUniversity(undefined);
    }
  }, [defaultValue, options]);

  const handleSelect = useCallback(
    (university: University) => {
      setSelectedUniversity(university);
      onChange?.(university);
    },
    [onChange]
  );

  return (
    <Command className="bg-transparent">
      <div className="sticky top-0 z-10 bg-transparent">
        <CommandInput placeholder="Search university..." />
      </div>
      <CommandList className="h-full">
        <CommandEmpty>No university found.</CommandEmpty>
        <CommandGroup>
          {options
            .filter((x) => x.name)
            .map((option, key: number) => (
              <CommandItem
                ref={option.name === defaultValue ? selectedRef : null}
                className={cn(
                  "my-1 flex w-full items-center gap-2 rounded-xl p-3 transition-colors",
                  option.name === selectedUniversity?.name
                    ? "bg-accent-yellow text-black data-[selected=true]:bg-accent-yellow data-[selected=true]:text-black"
                    : "hover:bg-primary-50"
                )}
                key={key}
                onSelect={() => handleSelect(option)}
              >
                <div className="flex w-0 flex-grow space-x-2 overflow-hidden">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {option.name}
                  </span>
                </div>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4 shrink-0",
                    option.name === selectedUniversity?.name
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

UniversitySelectlistComponent.displayName = "UniversitySelectlistComponent";

export const UniversitySelectlist = forwardRef(UniversitySelectlistComponent);
