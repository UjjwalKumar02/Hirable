import { Form } from "@/app/generated/prisma/client";
import { Dispatch, SetStateAction } from "react";

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
  setPopup: Dispatch<SetStateAction<"create" | null>>;
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
  type: string;
  label?: string;
  placeholder: string;
  reference?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  defaultValue?: string;
  readonly?: boolean;
}
