import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded hover:cursor-pointer bg-surface px-4 py-2 text-foreground",
        className
      )}
      {...props}
    />
  );
}
