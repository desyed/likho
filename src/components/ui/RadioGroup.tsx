"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
 React.ElementRef<typeof RadioGroupPrimitive.Root>,
 React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => {
 return (
  <RadioGroupPrimitive.Root
   className={cn(`grid gap-2 font-medium`, className)}
   {...props}
   ref={ref}
  >
   {children}
  </RadioGroupPrimitive.Root>
 );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
 React.ElementRef<typeof RadioGroupPrimitive.Item>,
 React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
 return (
  <RadioGroupPrimitive.Item
   ref={ref}
   className={cn(
    "aspect-square h-4 w-4 rounded-full border border-primary-accent7 text-primary-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    className
   )}
   {...props}
  >
   <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
    <div className="h-2 w-2 bg-primary-accent7 rounded-full transition-all animate-scale-up text-current" />
   </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
 );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
