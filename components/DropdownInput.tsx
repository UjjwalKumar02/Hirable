import { DropdownInputProps } from "@/types";

export default function DropdownInput({
  label,
  options,
  reference,
  className,
  disabled,
  onChange,
  defaultValue,
  required,
}: DropdownInputProps) {
  const defaultStyles =
    "outline-none bg-sky-50 text-sm text-gray-900 py-2 px-3 rounded-xl border border-gray-200";

  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1" htmlFor={label}>
        {label}
      </label>
      <select
        ref={reference}
        id={label}
        className={`${className} ${defaultStyles}`}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
      >
        <option value="">Select</option>
        {options.map((o, index) => (
          <option key={index} value={o} disabled={disabled}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
