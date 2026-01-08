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

    await prisma.$transaction(
      async (tx) => {
        // 1. Delete old fields
        await tx.formField.deleteMany({
          where: { formId },
        });

        // 2. Create new fields
        await tx.formField.createMany({
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

        // 3. Update form details
        await tx.form.update({
          where: { id: formId },
          data: {
            title,
            description: desc,
          },
        });
      },
      {
        maxWait: 15000, // 15 sec required to make transaction request to start
        timeout: 10000, // 10 sec max waits to complete the transaction
      }
    );

    console.log("updateForm called", formId, Date.now());
  } catch (error) {
    console.error("Update form failed:", error);
    throw new Error("Failed to update form");
  }
}
