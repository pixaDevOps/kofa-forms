const BASE_URL = "http://localhost:3000"; // backend

export async function createDonationOrder(payload) {
  const res = await fetch(`${BASE_URL}/api//payments/donation/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function createMembershipOrder(payload) {
  const res = await fetch(`${BASE_URL}/api//payments/membership/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function verifyPayment(payload) {
  const res = await fetch(`${BASE_URL}/api//payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
