"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "./utils";

// Biến thể toggle sử dụng class-variance-authority
const toggleVariants = {
  default: {
    default: "h-9 px-2 min-w-9 bg-transparent",
    sm: "h-8 px-1.5 min-w-8 bg-transparent",
    lg: "h-10 px-2.5 min-w-10 bg-transparent",
  },
  outline: {
    default:
      "h-9 px-2 min-w-9 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    sm: "h-8 px-1.5 min-w-8 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    lg: "h-10 px-2.5 min-w-10 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  },
};

function getToggleClasses(variant = "default", size = "default") {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap";
  return cn(base, toggleVariants[variant]?.[size]);
}

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(getToggleClasses(variant, size), className)}
      {...props}
    />
  );
}

export { Toggle };
