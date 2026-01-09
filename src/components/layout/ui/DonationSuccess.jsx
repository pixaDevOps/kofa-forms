import React from 'react'
import Success from '../../../assets/Donationsuccess.svg'

function DonationSuccess() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <div className="bg-white p-5 h-[334px] w-[310px] rounded-xl shadow-lg">
        <div className="flex justify-center">
          <div className="h-[170px] w-[170px]">
            <img
              src={Success}
              alt="Success"
              className="h-full w-full"
            />
          </div>
        </div>

        <h1 className="text-[#166932] pt-2 text-xl font-[#166932] font-bold text-center">
          ದೇಣಿಗೆ ಯಶಸ್ವಿಯಾಗಿದೆ
        </h1>

        <h6 className="text-[11px] text-[#092724] py-1 font-black pt-4 font-inter text-center">
  ನಿಮ್ಮ ದೇಣಿಗೆ ಕೊಡುಗೆಗೆ ಧನ್ಯವಾದಗಳು!
</h6>

<h6 className="text-[11px] text-[#092724] text-center font-semibold  font-inter">
  KOFA<span className='pl-1 text-[10px] text-[#092724] font-black text-center font-inter'>ಸಂಸ್ಥೆಯು ನಿಮ್ಮ ಬೆಂಬಲಕ್ಕೆ</span>
</h6>

<h6 className="text-[11px] text-[#092724] pt-1 font-inter font-black text-center ">
  ಹೃತ್ಪೂರ್ವಕ ಕೃತಜ್ಞತೆ ವ್ಯಕ್ತಪಡಿಸುತ್ತದೆ.
</h6>

      </div>
    </div>
  )
}

export default DonationSuccess
