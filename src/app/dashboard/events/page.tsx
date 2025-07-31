import { auth } from "@/auth";
import CreateEventPage from "./create/component/CreatePage";

const DashboardEvents = async () => {
  const session = await auth();

  // if (!session?.user) return notFound();

  return <CreateEventPage />;
};

export default DashboardEvents;
