export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}
