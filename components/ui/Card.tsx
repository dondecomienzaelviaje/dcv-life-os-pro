import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface border border-line rounded-2xl p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}