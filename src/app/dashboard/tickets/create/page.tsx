import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreateTicket from "./components/CreateTicket";

const DashboardTickets = async () => {
  const session = await auth();

  if (!session?.user) return redirect(`/login`);

  return <CreateTicket />;
};

export default DashboardTickets;
