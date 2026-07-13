import { useLocation, useNavigate } from "react-router-dom";
import success from '../../assets/rightmark.svg'
import download from '../../assets/Download.svg'
import cancelbtn from '../../assets/cancelbtn.svg'
const DonationDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return null;

const {
  donationData,
  applicationId,
  razorpay
} = state;

const razorpayPaymentId = razorpay?.razorpayPaymentId;


    const app = donationData.applicationData;
    // console.log(app)
    const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" :
    "th";

  return `${month} ${day}${suffix} ${year}`;
};

    return (
        <div className="fixed inset-0 flex items-center  justify-center bg-black/40">
            <div className="
        flex flex-col items-center
        relative
        w-[400.57px] h-[560.06px]
        bg-[#FCFCFC]
        rounded-[31.38px]
        
        
      ">

             
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-2 p-2 right-3 text-gray-400 "
                >
                    <img className=" className='h-[30px] w-[30px] " src={cancelbtn} ></img>
                </button>

              
                <div className="w-36 pt-5 h-40 rounded-full flex items-center justify-center">
                    <img src={success}></img>
                </div>

              
                <h2 className="text-[#166932] text-[20.94px] pt-1 font-bold">
                    ದೇಣಿಗೆ ಯಶಸ್ವಿಯಾಗಿದೆ
                </h2>

               
                <div className="w-full px-9 flex py flex-col">
                   {[
  ["ಹೆಸರು", app.name.kn || app.name.en],
  ["ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", app.mobile],
  ["ಸದಸ್ಯ ಐಡಿ", applicationId ? applicationId.slice(-4) : "—"],
  ["UTR No.", razorpayPaymentId || "N/A"],
  ["ದಿನಾಂಕ", formatDate(new Date())],
  ["ಮೊತ್ತ", `₹ ${donationData.amount}`],
  ["ಪಾವತಿ ವಿಧಾನ", "Razorpay"]
].map(([label, value]) => (
  <div
    key={label}
    className="flex justify-between grid grid-cols-[182px_1fr]  items-center py-2 border-b border-[#7F7F7F]"
  >
    <span className="font-semibold ">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
))}

                </div>

                
                <div className="m-3">
                    <button className="
        py-2 px-8
          bg-[#166932]
          rounded-[44px]
          text-[#FCFCFC]
         
          font-black
          flex items-center justify-center
        ">
                     <span> <img src={download} className=" h-[20px] w-[30px] font-black font-bold  "></img></span>   ರಸೀದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;
