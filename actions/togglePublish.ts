"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function togglePublish({
  slug,
  adminId,
  isPublic,
}: {
  slug: string;
  adminId: string;
  isPublic: boolean;
}) {
  try {
    await prisma.form.update({
      where: { slug, adminId },
      data: { isPublic },
    });
    revalidatePath(`/${slug}/dashboard`);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update form");
  }
}
