"use client";
import { Suspense } from "react";
import UnsubscribeForm from "./unsubscribe-form";

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeForm />
    </Suspense>
  );
}
