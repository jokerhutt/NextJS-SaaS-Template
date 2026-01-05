import { cn } from "@/lib/utils/cn";

type StatusVariant = "neutral" | "success" | "info" | "disabled";

type StatusProps = {
  message: string;
  status: StatusVariant;
  className?: string;
};

const STATUS_CONFIG: Record<
  StatusVariant,
  { icon: string; className: string }
> = {
  neutral: {
    icon: "⚪️",
    className: "text-muted",
  },
  success: {
    icon: "🟢",
    className: "text-green-500",
  },
  info: {
    icon: "🔵",
    className: "text-muted",
  },
  disabled: {
    icon: "⚫️",
    className: "text-black opacity-60",
  },
};

export function Status({ message, status, className }: StatusProps) {
  const { icon, className: statusClass } = STATUS_CONFIG[status];
  return (
    <p
      className={cn(
        "mb-4 font-bold flex items-center gap-2 text-sm",
        statusClass,
        className
      )}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </p>
  );
}
