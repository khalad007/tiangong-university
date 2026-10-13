import type { ComponentProps } from "react";
import { cn } from "cn";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="badge" className={cn("inline-flex items-center rounded-md border border-transparent bg-brand-tint px-2.5 py-1 text-xs font-semibold text-primary", className)} {...props} />;
}
