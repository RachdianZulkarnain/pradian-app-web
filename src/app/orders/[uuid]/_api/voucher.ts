const API = process.env.NEXT_PUBLIC_API_URL;

export const applyVoucher = async (
  uuid: string,
  code: string,
  token: string,
) => {
  const res = await fetch(`${API}/transactions/${uuid}/apply-voucher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ uuid, code }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to apply voucher");
  }

  return await res.json(); // { pricing: { totalTicketPrice, total } }
};
