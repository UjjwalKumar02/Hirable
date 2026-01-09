"use server";

import prisma from "@/lib/prisma";
import { FieldAnswer } from "@/types";

export async function submitForm({
  formId,
  answers,
}: {
  formId: string;
  answers: FieldAnswer[];
}) {
  try {
    await prisma.$transaction(
      async (tx) => {
        const submissison = await tx.submission.create({
          data: {
            formId,
          },
        });

        await tx.answer.createMany({
          data: answers.map((a) => ({
            fieldId: a.id ?? "",
            value: a.answer ?? "",
            submissionId: submissison.id,
          })),
        });
      },
      {
        maxWait: 15000,
        timeout: 10000,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to submit form!");
  }
}
