"use client";

import { useSearchParams, usePathname } from "next/navigation";

type ParamUpdate = {
  name: string;
  value: string | null | undefined;
};

export const useSearchParamsHelper = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSearchParam = (
    nameOrUpdates: string | ParamUpdate[],
    value?: string | null
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (typeof nameOrUpdates === "string") {
      if (value === null || value === undefined) {
        params.delete(nameOrUpdates);
      } else {
        params.set(nameOrUpdates, value || "");
      }
    } else {
      nameOrUpdates.forEach(({ name, value }) => {
        if (value === null || value === undefined) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    window.history.pushState({}, "", newUrl);
  };

  return { updateSearchParam };
};
