interface TextAreaBoxProps {
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function TextAreaBox({
  label,
  className,
  disabled,
  required,
  maxLength,
  onChange,
}: TextAreaBoxProps) {
  const defaultStyles =
    "resize-none outline-none bg-sky-50 rounded-xl border border-gray-200";
  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1">{label}</label>
      <textarea
        className={`${className} ${defaultStyles}`}
        readOnly={disabled}
        required={required}
        maxLength={
          maxLength === null || maxLength === undefined || maxLength === 0
            ? 10000
            : 8 * maxLength
        }
        onChange={onChange}
      />
    </div>
  );
}
