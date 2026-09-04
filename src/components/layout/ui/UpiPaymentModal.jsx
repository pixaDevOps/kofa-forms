import React, { useEffect, useState } from 'react';

function UpiPaymentModal({ isOpen, onClose, onSubmit, amount, type }) {
  // const [utr, setUtr] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [copied, setCopied] = useState(false);
  const [upiConfig, setUpiConfig] = useState({
    upiId: "kofa@upi",
    merchantName: "Kofa Foundation"
  });

  useEffect(() => {
    if (!isOpen) return;

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    fetch(`${baseUrl}/api/payments/upi-config`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data?.upiId && res.data?.merchantName) {
          setUpiConfig({
            upiId: res.data.upiId,
            merchantName: res.data.merchantName
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load UPI config", error);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const { upiId, merchantName } = upiConfig;
  
  // Construct standard UPI Payment deep link
  const note = type === "membership" ? "Kofa Membership Fee" : "Kofa Donation";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
  
  // Render QR Code using a public secure API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  // const isUtrValid = /^\d{12}$/.test(utr);
  const isFormValid = screenshot !== null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ screenshot });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-[420px] bg-white rounded-3xl p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="text-center border-b border-gray-100 pb-3 mb-4">
          <h2 className="text-[#166932] text-xl font-bold">UPI ಪಾವತಿ ವಿವರಗಳು</h2>
          <p className="text-xs text-gray-500 mt-1">ಯಾವುದೇ ಪಾವತಿ ಆಪ್ ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಪಾವತಿಸಿ</p>
        </div>

        {/* Amount Box */}
        <div className="bg-[#F0F7F4] rounded-2xl py-3 px-4 text-center mb-4">
          <span className="text-xs font-black text-gray-600 block">ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ</span>
          <span className="text-[#166932] text-2xl font-black">₹ {amount}</span>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="border-4 border-[#166932]/10 p-2 rounded-2xl bg-white shadow-sm">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-[180px] h-[180px] object-contain" 
            />
          </div>
          <span className="text-[10px] text-gray-400 mt-1.5">PhonePe, GPay, Paytm, BHIM ಅಥವಾ ಯಾವುದೇ UPI ಆಪ್ ಬಳಸಿ</span>
        </div>

        {/* UPI ID Copy Field */}
        <div className="mb-4">
          <label className="block text-[11px] font-black text-gray-500 mb-1">UPI ಐಡಿ</label>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 bg-gray-50">
            <span className="text-sm font-bold text-gray-700 select-all">{upiId}</span>
            <button 
              type="button" 
              onClick={handleCopyUpi}
              className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                copied ? 'bg-[#166932] text-white' : 'bg-[#166932]/10 text-[#166932] hover:bg-[#166932]/20'
              }`}
            >
              {copied ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'ಕಾಪಿ ಮಾಡಿ'}
            </button>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* UTR Input */}
          {/* <div>
            <label className="block text-[11px] font-black text-[#222225] mb-1">
              UPI ಯುಟಿಆರ್ ಸಂಖ್ಯೆ (12 ಅಂಕೆಗಳು) <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              maxLength={12}
              value={utr}
              onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
              placeholder="12 ಅಂಕೆಗಳ UTR ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-[#166932] focus:ring-1 focus:ring-[#166932]"
            />
            {utr && !isUtrValid && (
              <span className="text-[10px] text-red-500 mt-1 block">ಮಾನ್ಯ 12 ಅಂಕೆಗಳ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ</span>
            )}
          </div> */}

          {/* Screenshot Upload */}
          <div>
            <label className="block text-[11px] font-black text-[#222225] mb-1">
              ಪಾವತಿ ರಸೀದಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ <span className="text-red-500">*</span>
            </label>
            <div className="relative border border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-xs text-gray-600 block truncate">
                {screenshot ? screenshot.name : "ರಸೀದಿಯ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ"}
              </span>
              <span className="text-[9px] text-gray-400 block mt-0.5">JPEG, JPG, PNG (ಗರಿಷ್ಠ 5MB)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              ರದ್ದುಗೊಳಿಸಿ
            </button>
            <button 
              type="submit" 
              disabled={!isFormValid}
              className="flex-1 py-2 bg-[#166932] text-white rounded-full text-xs font-bold hover:bg-[#125428] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              ನಾನು ಪಾವತಿಸಿದ್ದೇನೆ
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default UpiPaymentModal;
