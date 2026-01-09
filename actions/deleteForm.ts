"use server";

import prisma from "@/lib/prisma";

export async function deleteForm({
  slug,
  adminId,
}: {
  slug: string;
  adminId: string;
}) {
  try {
    await prisma.form.delete({
      where: {
        slug,
        adminId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete form");
  }
}
