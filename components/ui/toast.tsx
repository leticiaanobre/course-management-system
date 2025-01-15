import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { clsx } from "clsx";
import { cva } from "class-variance-authority";

const toastVariants = cva(
  "bg-white border border-gray-200 rounded-md p-4 shadow-lg flex items-center space-x-2",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        destructive: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & { variant?: "default" | "destructive" }
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={clsx(toastVariants({ variant }), className)}
    {...props}
  />
));

Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastAction = ToastPrimitives.Action;
export const ToastClose = ToastPrimitives.Close;
export const ToastTitle = ToastPrimitives.Title;
export const ToastDescription = ToastPrimitives.Description;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx("fixed bottom-0 right-0 flex flex-col p-4 space-y-2 w-[300px] z-[9999]", className)}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
