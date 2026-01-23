import { ButtonProps } from "@/types";

export function ButtonV2({
  variant,
  size,
  children,
  onClick,
  className,
  loading,
  disabled,
  type,
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-black text-gray-100",
    secondary: "bg-white border border-gray-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-7 py-1.5 text-md",
  };

  const defaultStyles = "rounded-lg";

  return (
    <button
      className={`${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${className} ${defaultStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
