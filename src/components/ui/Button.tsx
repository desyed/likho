import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
 "inline-flex items-center gap-2 border border-transparent font-medium justify-center rounded-md text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-primary-foreground focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60",
 {
  variants: {
   variant: {
    primary: cn(
     "bg-primary text-primary-foreground hover:bg-primary-accent7 active:bg-primary-accent1 active:text-primary active:border-primary-accent5 disabled:bg-primary-accent2 disabled:text-primary-accent3",
     "dark:hover:bg-dark-light3 dark:active:bg-dark-shape2 dark:active:border-dark-light3 dark:disabled:bg-dark-shape2 dark:disabled:text-primary-accent4"
    ),
    secondary: cn(
     "bg-transparent text-primary border-primary-accent2 hover:text-primary hover:bg-primary-accent1 active:bg-primary-accent1 active:border-primary-accent5 disabled:bg-transparent disabled:text-primary-accent3 disabled:border-border",
     "dark:border-primary-accent6 dark:hover:border-transparent dark:hover:bg-border dark:active:bg-dark-shape2 dark:active:border-primary-accent3 dark:focus-visible:border-transparent dark:focus-visible:bg-dark-shape"
    ),
    destructive: cn(
     "bg-destructive-light text-primary-foreground hover:bg-destructive-dark active:bg-destructive-lighter active:border-destructive active:text-destructive-dark focus-visible:bg-destructive-dark disabled:bg-destructive-lighter disabled:text-destructive-light",
     "dark:bg-destructive dark:text-primary dark:hover:bg-destructive-light dark:active:bg-destructive-lighter dark:active:text-destructive dark:disabled:bg-destructive-lighter dark:disabled:text-destructive-light dark:disabled:border-transparent"
    ),
    ghost: cn(
     "hover:border-primary-accent4 active:bg-primary-accent1 active:border-primary-accent5 focus-visble:bg-accent/20 focus-visible:bg-primary-accent1 disabled:text-primary-accent3",
     "dark:text-primary dark:hover:border-dark-light3 dark:active:bg-dark-shape2 dark:active:border-primary-accent3 dark:disabled:text-primary-accent4"
    ),
    apple: cn(
     "bg-primary text-primary-foreground hover:text-primary hover:bg-transparent hover:border-primary-accent4 active:border-primary-accent5 active:bg-primary-accent1 disabled:bg-primary-accent2 disabled:text-primary-accent3",
     "[&>svg]:hover:fill-primary [&>svg]:disabled:fill-primary-accent3",
     "dark:hover:border-dark-light3 dark:active:bg-dark-shape2 dark:active:border-primary-accent3 dark:disabled:text-primary-accent4 dark:disabled:bg-dark-shape2"
    ),
    google: cn(
     "bg-primary-accent2 hover:border-primary-accent4 active:bg-primary-accent1 active:border-primary-accent5 disabled:bg-primary-accent2 disabled:text-primary-accent3",
     "dark:bg-primary dark:text-primary-foreground dark:hover:bg-transparent dark:hover:border-dark-light3 dark:hover:text-primary dark:active:bg-dark-shape"
    ),
    facebook: cn(
     "bg-blue text-primary-foreground hover:bg-transparent hover:border-blue hover:text-primary active:bg-primary-accent1 disabled:bg-primary-accent2 disabled:text-primary-accent3",
     "[&>svg>.path-1]:fill-white [&>svg>.path-1]:hover:fill-blue [&>svg>.path-2]:fill-blue [&>svg>.path-2]:hover:fill-white",
     "dark:text-primary dark:active:bg-[#085BC854]"
    ),
    microsoft: cn(
     "bg-primary-accent7 text-primary-foreground hover:bg-transparent hover:text-primary hover:border-primary-accent4 active:border-primary-accent5 active:bg-primary-accent1",
     "dark:bg-primary dark:hover:bg-transparent dark:hover:border-dark-light3 dark:active:bg-dark-shape2"
    ),
   },
   size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-5",
    icon: "h-9 w-9",
   },
  },
  defaultVariants: {
   variant: "primary",
   size: "default",
  },
 }
);

export interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
 asChild?: boolean;
 loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 (
  { className, variant, loading, children, size, asChild = false, ...props },
  ref
 ) => {
  const Comp = asChild ? Slot : "button";

  const renderSocialIcon = () => {
   switch (variant) {
    case "apple":
     return (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
       height="20"
       viewBox="0 0 20 20"
       fill="none"
       className="fill-primary-foreground"
      >
       <path d="M17.1858 7.1362C17.0814 7.2172 15.2382 8.2558 15.2382 10.5652C15.2382 13.2364 17.5836 14.1814 17.6538 14.2048C17.643 14.2624 17.2812 15.499 16.4172 16.759C15.6468 17.8678 14.8422 18.9748 13.6182 18.9748C12.3942 18.9748 12.0792 18.2638 10.6662 18.2638C9.2892 18.2638 8.7996 18.9982 7.68 18.9982C6.5604 18.9982 5.7792 17.9722 4.881 16.7122C3.8406 15.2326 3 12.934 3 10.7524C3 7.2532 5.2752 5.3974 7.5144 5.3974C8.7042 5.3974 9.696 6.1786 10.443 6.1786C11.154 6.1786 12.2628 5.3506 13.6164 5.3506C14.1294 5.3506 15.9726 5.3974 17.1858 7.1362ZM12.9738 3.8692C13.5336 3.205 13.9296 2.2834 13.9296 1.3618C13.9296 1.234 13.9188 1.1044 13.8954 1C12.9846 1.0342 11.901 1.6066 11.2476 2.3644C10.7346 2.9476 10.2558 3.8692 10.2558 4.8034C10.2558 4.9438 10.2792 5.0842 10.29 5.1292C10.3476 5.14 10.4412 5.1526 10.5348 5.1526C11.352 5.1526 12.3798 4.6054 12.9738 3.8692Z" />
      </svg>
     );
    case "google":
     return (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="18"
       height="18"
       viewBox="0 0 18 18"
       fill="none"
      >
       <path
        d="M17.6175 9.20268C17.6175 8.61018 17.565 8.04768 17.475 7.50018H9V10.8827H13.8525C13.635 11.9927 12.9975 12.9302 12.0525 13.5677V15.8177H14.9475C16.6425 14.2502 17.6175 11.9402 17.6175 9.20268Z"
        fill="#4285F4"
       />
       <path
        d="M9.00027 17.9998C11.4303 17.9998 13.4628 17.1898 14.9478 15.8173L12.0528 13.5673C11.2428 14.1073 10.2153 14.4373 9.00027 14.4373C6.65277 14.4373 4.66527 12.8548 3.95277 10.7173H0.967773V13.0348C2.44527 15.9748 5.48277 17.9998 9.00027 17.9998Z"
        fill="#34A853"
       />
       <path
        d="M3.9525 10.7173C3.765 10.1773 3.6675 9.59978 3.6675 8.99978C3.6675 8.39978 3.7725 7.82228 3.9525 7.28228V4.96478H0.967499C0.352499 6.17978 0 7.54478 0 8.99978C0 10.4548 0.352499 11.8198 0.967499 13.0348L3.9525 10.7173Z"
        fill="#FBBC05"
       />
       <path
        d="M9.00027 3.5625C10.3278 3.5625 11.5128 4.02 12.4503 4.9125L15.0153 2.3475C13.4628 0.892501 11.4303 0 9.00027 0C5.48277 0 2.44527 2.025 0.967773 4.965L3.95277 7.2825C4.66527 5.145 6.65277 3.5625 9.00027 3.5625Z"
        fill="#EA4335"
       />
      </svg>
     );
    case "facebook":
     return (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
       height="20"
       viewBox="0 0 20 20"
       fill="none"
      >
       <path
        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        className="path-1 "
       />
       <path
        d="M13.5033 12.6021L13.902 9.9999H11.4061V8.31153C11.4061 7.60023 11.7542 6.90539 12.873 6.90539H14.0083V4.69052C14.0083 4.69052 12.9781 4.51459 11.9934 4.51459C9.93797 4.51459 8.59386 5.75999 8.59386 8.01663V9.9999H6.30811V12.6021H8.59386V18.8911C9.05202 18.9632 9.52158 18.9999 9.99999 18.9999C10.4784 18.9999 10.948 18.9619 11.4061 18.8911V12.6021H13.5033Z"
        className="path-2"
       />
      </svg>
     );
    case "microsoft":
     return (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="20"
       height="20"
       viewBox="0 0 20 20"
       fill="none"
      >
       <rect
        x="10.7271"
        y="10.7274"
        width="7.15"
        height="7.15"
        fill="#FEBA08"
       />
       <rect x="2" y="10.7274" width="7.15" height="7.15" fill="#05A6F0" />
       <rect x="10.7271" y="2" width="7.15" height="7.15" fill="#80BC06" />
       <rect x="2" y="2" width="7.15" height="7.15" fill="#F25325" />
      </svg>
     );
   }
  };
  return (
   <Comp
    className={cn(buttonVariants({ variant, size, className }))}
    ref={ref}
    {...props}
    disabled={props.disabled || loading}
   >
    {size === "icon" ? (
     <>
      {loading ? (
       <Loader2 size={15} />
      ) : (
       <>
        {renderSocialIcon()}
        {children}
       </>
      )}
     </>
    ) : (
     <>
      {loading ? <Loader2 size={15} /> : <>{renderSocialIcon()}</>} {children}
     </>
    )}
   </Comp>
  );
 }
);
Button.displayName = "Button";

export { Button, buttonVariants };
