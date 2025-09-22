import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import { auth } from "@clerk/nextjs/server";

export default async function Redirect() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <Dashboard />;
}
