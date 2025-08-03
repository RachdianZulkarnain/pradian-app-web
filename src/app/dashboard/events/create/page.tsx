import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import CreateEvent from "./component/CreateEvent";

const DashboardEvents = async () => {
  const session = await auth();

  if (!session?.user) return redirect(`/login`);

  return <CreateEvent />;
};

export default DashboardEvents;
