import OrderDetails from "./components/OrderDetails";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const uuid = (await params).uuid;

  return <OrderDetails uuid={uuid} />;
}
