import { ButtonProps } from "@/types";

export function Button({
  variant,
  size,
  children,
  onClick,
  className,
  loading,
  disabled,
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-black text-gray-100",
    secondary: "bg-sky-500 text-white",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-6 py-2 text-md",
  };

  const defaultStyles = "rounded-xl font-medium";

  return (
    <button
      className={`${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${className} ${defaultStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
