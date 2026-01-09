import SubmitForm from "@/components/SubmitForm";
import prisma from "@/lib/prisma";
import { Field, FieldType } from "@/types";

export default async function Submit({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = (await params).slug;

  let form;
  try {
    console.log("Fetching db from submit form ssr!");
    form = await prisma.form.findUnique({
      where: { slug },
      include: {
        fields: true,
      },
    });
  } catch (error) {
    console.log(error);
    return <div>Internal server error</div>;
  }

  // Converting DB fetched data to frontend field type
  let fieldList: Field[] = [];
  if (form && form.fields.length !== 0) {
    for (let i = 0; i < form?.fields.length; i++) {
      fieldList.push({
        id: form.fields[i].id,
        label: form.fields[i].label,
        type: form.fields[i].type as FieldType,
        options: form.fields[i].options,
        required: form.fields[i].required,
        wordLimit: form.fields[i].wordLimit,
      });
    }
  }
  return (
    <SubmitForm
      title={form?.title ?? ""}
      desc={form?.description ?? ""}
      fieldList={fieldList}
      formId={form?.id ?? ""}
    />
  );
}
