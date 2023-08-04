"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({
 className,
 ...props
}: DialogPrimitive.DialogPortalProps) => (
 <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Overlay>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Overlay
  className={cn(
   "fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
   className
  )}
  {...props}
  ref={ref}
 />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Content>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
 <DialogPortal>
  <DialogOverlay />
  <DialogPrimitive.Content
   ref={ref}
   className={cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]  bg-primary-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
    "dark:bg-dark-shape2",
    className
   )}
   {...props}
  >
   {children}
   <DialogPrimitive.Close className="absolute p-1 right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 active:bg-primary-accent2 dark:active:bg-border focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent">
    <Cross2Icon className="h-4 w-4" />
    <span className="sr-only">Close</span>
   </DialogPrimitive.Close>
  </DialogPrimitive.Content>
 </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
 className,
 ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
 <div
  className={cn(
   "flex flex-col space-y-1.5 text-center sm:text-left",
   className
  )}
  {...props}
 />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
 className,
 ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
 <div
  className={cn(
   "flex flex-col-reverse sm:flex-row sm:justify-start sm:space-x-2 mt-4",
   className
  )}
  {...props}
 />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Title>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Title
  ref={ref}
  className={cn(
   "text-lg font-semibold text-primary-accent8",
   "dark:text-dark-light1",
   className
  )}
  {...props}
 />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
 React.ElementRef<typeof DialogPrimitive.Description>,
 React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
 <DialogPrimitive.Description
  ref={ref}
  className={cn(
   "text-sm text-primary-accent3",
   "dark:text-dark-light3",
   className
  )}
  {...props}
 />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
 Dialog,
 DialogTrigger,
 DialogContent,
 DialogClose,
 DialogHeader,
 DialogFooter,
 DialogTitle,
 DialogDescription,
};
