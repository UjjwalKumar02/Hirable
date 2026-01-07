"use server";

import { FormFieldType } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { Field } from "@/types";

export async function updateForm({
  fieldList,
  formId,
  title,
  desc,
}: {
  title: string;
  desc: string;
  fieldList: Field[];
  formId: string;
}) {
  try {
    console.log("Updating form in db from server action!");

    await prisma.formField.deleteMany({
      where: { formId },
    });

    await prisma.formField.createMany({
      data: fieldList.map((f, index) => ({
        label: f.label,
        type: f.type as FormFieldType,
        required: f.required,
        wordLimit: f.wordLimit,
        options: f.options ?? [],
        formId,
        order: index + 1,
      })),
    });

    await prisma.form.update({
      where: { id: formId },
      data: {
        title,
        description: desc,
      },
    });

    console.log("updateForm called", formId, Date.now());
  } catch (error) {
    console.error("Update form failed:", error);
    throw new Error("Failed to update form");
  }
}
