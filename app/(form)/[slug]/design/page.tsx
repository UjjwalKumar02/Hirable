import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DesignContent } from "@/components/DesignContent";
import prisma from "@/lib/prisma";
import { Field, FieldType } from "@/types";
import { getServerSession } from "next-auth";

export default async function Design({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return <div>Unauthenticated!</div>;
  }

  let form;

  try {
    console.log("fetching db from design ssr...");
    form = await prisma.form.findUnique({
      where: { slug, adminId: session.user.id },
      include: {
        fields: true,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }

  // Converting fields from db to frontend field interface
  let fieldList: Field[] = [];
  if (form && form.fields.length !== 0) {
    for (let i = 0; i < form.fields.length; i++) {
      fieldList.push({
        label: form.fields[i].label,
        type: form.fields[i].type as FieldType,
        required: form.fields[i].required,
        wordLimit: form.fields[i].wordLimit,
        options: form.fields[i].options,
      });
    }
  }

  return (
    <DesignContent
      formTitle={form?.title ?? ""}
      formDesc={form?.description ?? ""}
      fields={fieldList}
      formId={form?.id ?? ""}
    />
  );
}
