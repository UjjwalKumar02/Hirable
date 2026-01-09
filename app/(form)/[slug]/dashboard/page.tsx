import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormDashboardContent } from "@/components/FormDashboardContent";
import prisma from "@/lib/prisma";
import { Field, FieldAnswer, FieldType } from "@/types";
import { getServerSession } from "next-auth";

export default async function FormDashboard({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;
  const session = await getServerSession(authOptions);

  // Checking if user is authenticated or not
  if (!session || !session.user || !session.user.id) {
    return <div>Unauthenticated!</div>;
  }

  let form;
  let dbSubmissionList;
  try {
    console.log("Fetching db from form dashboard ssr!");
    // form details and field list
    form = await prisma.form.findUnique({
      where: { slug, adminId: session.user.id },
      include: { fields: true },
    });

    // answers list per submission
    dbSubmissionList = await prisma.submission.findMany({
      where: { formId: form?.id },
      include: { answers: true },
    });
  } catch (error) {
    console.log(error);
    return <div>Internal server error!</div>;
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

  // Converting DB fetched submission into frontend submissionList type
  let submissionList: FieldAnswer[][] = [];

  dbSubmissionList.forEach((sub, subIndex) => {
    submissionList[subIndex] = [];

    for (let i = 0; i < sub.answers.length; i++) {
      submissionList[subIndex].push({
        id: sub.answers[i].fieldId,
        answer: sub.answers[i].value as string,
      });
    }
  });

  return (
    <FormDashboardContent
      title={form?.title ?? ""}
      desc={form?.description ?? ""}
      isPublic={form?.isPublic ?? false}
      fields={fieldList}
      submissions={submissionList}
      avatar={session.user.image ?? ""}
      slug={slug}
      adminId={session.user.id}
    />
  );
}
