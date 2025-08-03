import { redirect } from "next/navigation";
import { auth } from "@/auth";
import CreateVoucher from "./components/CreateVoucher";

const DashboardVouchers = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/login");

  return <CreateVoucher />;
};

export default DashboardVouchers;
