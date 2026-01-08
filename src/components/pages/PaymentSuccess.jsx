import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import thankYouImg from "../../assets/thank-you.png";

const BASE_URL = "http://localhost:3000";

function PaymentSuccess() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(true);
 
  useEffect(() => {
    fetch(`${BASE_URL}/api/applications/${applicationId}`)
      .then(res => res.json())
      .then(res => {
        setApplication(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [applicationId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThankYou(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8] px-4">
      {showThankYou ? (
        <ThankYouPopup />
      ) : (
        <MembershipCard application={application} navigate={navigate} />
      )}
    </div>
  );
}

export default PaymentSuccess;

function ThankYouPopup() {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-[320px] p-6 text-center animate-fadeIn">

      {/* Figma Image / Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={thankYouImg}
          alt="Thank you"
          className="w-36 h-auto"
        />
      </div>

      <h2 className="text-[#166932] text-xl font-bold mb-2">
        ಧನ್ಯವಾದಗಳು
      </h2>

      <p className="text-sm text-gray-600">
        ನಮ್ಮ ಸಂಸ್ಥೆಗೆ ನೀವು ಸದಸ್ಯರಾಗಿರುವುದು ನಮಗೆ ತುಂಬಾ
              ಸಂತೋಷವನ್ನು ನೀಡುತ್ತದೆ
      </p>
    </div>
  );
}

/* ---------- MEMBERSHIP CARD (NEW FIGMA STYLE) ---------- */
function MembershipCard({ application, navigate }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg w-[320px] p-6 text-center relative animate-slideUp">

      {/* Close Icon */}
      <button
        className="absolute top-3 right-3 text-gray-400 text-xl"
        onClick={() => navigate("/")}
      >
        ×
      </button>

      <p className="text-[#166932] font-bold text-base mb-1">
        ಹೆಸರು : {application.name}
      </p>

      <p className="text-[#166932] font-semibold mb-3">
        ಸದಸ್ಯ ಐಡಿ : {application.membershipNumber}
      </p>

      <h3 className="text-lg font-bold mb-1">
        ಧನ್ಯವಾದಗಳು
      </h3>

      <p className="text-xs text-gray-600 mb-5">
        ನಮ್ಮ ಸಂಸ್ಥೆಗೆ ನೀವು ಸದಸ್ಯರಾಗಿರುವುದು ನಮಗೆ ತುಂಬಾ
                ಸಂತೋಷವನ್ನು ನೀಡುತ್ತದೆ
      </p>

      <button
        onClick={() => window.print()}
        className="bg-[#166932] text-white px-5 py-2 rounded-full text-sm font-bold mx-auto"
      >
        ಡೌನ್ಲೋಡ್ ಕಾರ್ಡ್
      </button>
    </div>
  );
}
