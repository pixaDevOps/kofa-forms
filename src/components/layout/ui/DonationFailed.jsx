import React from 'react'
import Failedimg from '../../../assets/Failed.svg'
import cancelbtn from'../../../assets/cancelbtn.svg'
function DonationFailed({ onClose , onRetry }) {

    return (

        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <div className="bg-white p-4 h-[380px] w-[350px] rounded-xl shadow-lg">
                <div className='flex justify-end' onClick={onClose}><img  src={cancelbtn} alt='cancelbtn' className='h-[30px] w-[30px]  '></img></div>
                <div className="flex justify-center">
                    <div className="h-[170px] w-[170px]">
                        <img
                            src={Failedimg}
                            alt="Success"
                            className="h-full w-full"
                        />
                    </div>
                </div>

                <h1 className="text-[#C82B34] pt-2 text-xl font-[#166932] font-bold text-center">
                    ಪಾವತಿ ವಿಫಲವಾಗಿದೆ
                </h1>

                <h6 className="text-[10px] text-[#092724] py-1 font-black pt-4 font-inter text-center">
                    ದೋಷದ ಕಾರಣದಿಂದ ಪಾವತಿ ವಿಫಲವಾಗಿದೆ, 
                </h6>

                <h6 className='pl-1 text-[10px] text-[#092724] font-black text-center font-inter'>
                    ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.
                </h6>

<div className="flex justify-center pt-4">
  <button  onClick={onRetry}
    className="h-[30px] rounded-full font-black text-[12px] px-12 inline-flex items-center justify-center transition-colors bg-[#166932]
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white"
  >
    ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ
  </button>
</div>


            </div>
        </div>

    )
}

export default DonationFailed