interface TextAreaBoxProps {
  label: string;
  className?: string;
  disabled?: boolean
}

export default function TextAreaBox({ label, className, disabled }: TextAreaBoxProps) {
  const defaultStyles =
    "resize-none outline-none bg-sky-50 rounded-xl border border-gray-200";
  return (
    <div className="flex flex-col gap-2">
      <label className="pl-1">{label}</label>
      <textarea className={`${className} ${defaultStyles}`} readOnly={disabled}/>
    </div>
  );
}
