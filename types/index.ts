import { Form } from "@/app/generated/prisma/client";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface CreateFormCardProps {
  setPopup: React.Dispatch<React.SetStateAction<"create" | null>>;
  userId?: string;
}

export interface DashboardContentProps {
  forms: Form[];
}

export interface NewFormProps {
  title: string;
  description: string;
  coverImage: string;
  adminId: string;
}

export interface FormCardProps {
  title: string;
  slug: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface InputBoxProps {
  size: "sm" | "md" | "lg";
  type: "text" | "long text";
  label?: string;
  placeholder?: string;
  reference?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  defaultValue?: string;
  readonly?: boolean;
}

export interface DesignContentProps {
  formTitle: string;
  formDesc: string;
  fields: Field[];
  formId: string;
}

export interface DropdownInputProps {
  label: string;
  options: string[];
  reference?: React.RefObject<HTMLSelectElement | null>;
  className?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string;
}

export type FieldType = "text" | "longtext" | "email" | "number" | "dropdown";

export interface Field {
  label: string;
  type: FieldType;
  options?: string[];
  required: boolean;
  wordLimit?: number | null;
}

export interface DesignFormProps {
  title: string;
  description: string;
  fieldList: Field[];
  currentEditField?: number | null;
  setCurrentEditField: React.Dispatch<number | null>;
  setFieldList: React.Dispatch<React.SetStateAction<Field[]>>;
  currentEditHeading: "title" | "desc" | null;
  setCurrentEditHeading: React.Dispatch<
    React.SetStateAction<"title" | "desc" | null>
  >;
  setTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setDesc: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface EditFieldProps {
  setCurrentEditField: React.Dispatch<number | null>;
  setFieldList: React.Dispatch<React.SetStateAction<Field[]>>;
  index: number;
  fieldData: Field;
}
