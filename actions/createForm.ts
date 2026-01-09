"use server";

import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/helpers/generateSlug";
import { NewFormProps } from "@/types";
import { revalidatePath } from "next/cache";

export async function createForm({
  title,
  description,
  coverImage,
  adminId,
}: NewFormProps) {
  if (!title) return;

  const slug = generateSlug(title);

  try {
    console.log("Creating form in db from server component...");
    await prisma.form.create({
      data: {
        title,
        description,
        coverImage,
        adminId,
        slug,
        isPublic: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create form!");
  }

  revalidatePath("/dashboard");
}
