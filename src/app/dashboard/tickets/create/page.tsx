import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import CreateTicket from "./components/CreateTicket"; // sesuaikan path jika beda

const DashboardTickets = async () => {
  const session = await auth();

  if (!session?.user) return redirect(`/login`);

  return <CreateTicket />;
};

export default DashboardTickets;
