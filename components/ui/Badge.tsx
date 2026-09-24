import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "gold" | "success" | "warning";
};

export default function Badge({
  variant = "gold",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    gold: "bg-gold-dim text-gold",
    success: "bg-[rgba(120,180,140,.15)] text-[#9fd0af]",
    warning: "bg-[rgba(200,90,90,.15)] text-[#e0a3a3]",
  };

  return (
    <span
      className={`inline-block text-xs px-2.5 py-1 rounded-full ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}