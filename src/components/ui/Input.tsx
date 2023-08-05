import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sharedClasses = cn("bg-primary-foreground", "dark:bg-dark-shape3");
const affixesClasses = cn(
 "flex items-center text-primary-accent5",
 "dark:text-dark-light1"
);

const inputVariants = cva(
 cn(
  "flex gap-3 h-10 w-full shadow-sm rounded-lg border text-primary px-1 text-sm ring-offset-primary-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium transition-shadow disabled:cursor-not-allowed disabled:select-none disabled:opacity-60",
  "focus-within:ring-2 focus-within:ring-offset-primary-foreground focus-within:ring-ring focus-within:ring-offset-1",
  sharedClasses
 ),
 {
  variants: {
   inputSize: {
    default: "h-10",
    sm: "h-8",
    lg: "h-12",
   },
   status: {
    default: "border",
    error: "border-destructive focus-within:ring-destructive-light",
    warning: "border-warning focus-within:ring-warning-light",
    success: "border-green-500 focus-within:ring-green-500/40",
   },
  },
  defaultVariants: {
   inputSize: "default",
   status: "default",
  },
 }
);

export interface InputProps
 extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
 suffix?: any;
 prefix?: any;
 clearable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
 (
  { className, type, suffix, prefix, inputSize, status, clearable, ...props },
  ref
 ) => {
  const [value, setValue] = React.useState(props.value || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setValue(event.target.value);
   if (props.onChange) {
    props.onChange(event);
   }
  };

  const handleClearClick = () => {
   setValue("");
   if (props.onChange) {
    const event = new Event("input", { bubbles: true });
    Object.defineProperty(event, "target", {
     writable: false,
     value: { value: "", ...props },
    });
    props.onChange(event as any);
   }
  };

  return (
   <div
    className={cn(
     inputVariants({ inputSize, status, className }),
     "relative w-max"
    )}
   >
    {prefix && <div className={cn(affixesClasses, "pl-3")}>{prefix}</div>}
    <div className="relative h-full w-max">
     <input
      type={type}
      className={cn(
       "placeholder:text-primary-accent4 h-full focus-visible:outline-none active:border-red-500",
       `${!prefix && "pl-2"}`,
       "dark:placeholder:text-dark-light2",
       sharedClasses,
       className
      )}
      ref={ref}
      value={value}
      onChange={handleInputChange}
      {...props}
     />
     {clearable && value !== "" && (
      <button
       type="button"
       className={cn(
        "absolute inset-y-0 right-0 cursor-pointer",
        `${!suffix ? "pr-2" : ""}`
       )}
       onClick={handleClearClick}
      >
       <Cross2Icon className="h-4 w-4" />
      </button>
     )}
    </div>

    {suffix && <div className={cn(affixesClasses, "pr-3")}>{suffix}</div>}
   </div>
  );
 }
);

Input.displayName = "Input";

export { Input, inputVariants };
