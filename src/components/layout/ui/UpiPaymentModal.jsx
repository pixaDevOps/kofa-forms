import { useState } from "react";

const UpiPaymentModal = ({ isOpen, onClose, onSubmit, amount, type }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!screenshot) {
      setError("ದಯವಿಟ್ಟು ಪಾವತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ");
      return;
    }

    onSubmit({ screenshot });
  };

  const handleClose = () => {
    setScreenshot(null);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#166932]">UPI Payment</h2>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              ₹ {amount} {type ? `- ${type}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-2xl font-bold leading-none text-gray-500"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <label className="mb-2 block text-xs font-black text-[#222225]">
          Payment screenshot
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            setScreenshot(event.target.files?.[0] || null);
            setError("");
          }}
          className="w-full rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-sm"
        />

        {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-gray-300 px-5 py-2 text-xs font-black text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-[#166932] px-5 py-2 text-xs font-black text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpiPaymentModal;
