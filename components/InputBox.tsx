import { InputBoxProps } from "@/types";

export default function InputBox({
  size,
  type,
  label,
  placeholder,
  reference,
  className,
  readonly,
  defaultValue,
}: InputBoxProps) {
  const sizeStyles = {
    sm: "",
    md: "min-w-60 px-3 py-2 text-sm",
    lg: "",
  };

  const defaultStyles =
    "outline-none bg-sky-50 rounded-xl border border-gray-200";

  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1">{label}</label>
      <input
        ref={reference}
        type={type}
        placeholder={placeholder}
        className={`${className} ${sizeStyles[size]} ${defaultStyles}`}
        readOnly={readonly}
        defaultValue={defaultValue}
      />
    </div>
  );
}
