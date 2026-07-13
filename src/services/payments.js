const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";

export async function submitUpiPayment(formData) {
  const res = await fetch(`${BASE_URL}/payments/upi/submit`, {
    method: "POST",
    // Note: Do NOT set Content-Type header. The browser will set it automatically
    // with the multipart boundary string when passing a FormData instance.
    body: formData
  });
  return res.json();
}
