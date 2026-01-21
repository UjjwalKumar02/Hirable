import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
// import { DashboardContent } from "@/components/DashboardContent";
import { Form } from "../generated/prisma/client";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardContentV2 from "../../componentsV2/DashboardContentV2";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated or not
  if (!session || !session.user) {
    return <div>You are not logged in!</div>;
  }

  let forms: Form[] = [];
  try {
    console.log("fetching db from dashboard ssr...");
    forms = await prisma.form.findMany({
      where: { adminId: session?.user.id },
    });
  } catch (error) {
    console.log(error);
    return <div>Internal server error!</div>;
  }

  // return <DashboardContent forms={forms} />;

  return (
    <DashboardContentV2
      userId={session.user.id ?? ""}
      avatar={session.user.image ?? ""}
      forms={forms}
    />
  );
}
