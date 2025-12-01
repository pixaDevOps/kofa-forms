import React from 'react'

import Money from '../../assets/Money.svg'
import iconBack from '../../assets/lets-icons_back.svg'
function MembersReg() {
    return (
        <>
            <div className='px-6'>
                <h1 className='text-[#166932] text-[40px] md:text-3xl font-black text-center py-6 md:py-8'>ಸದಸ್ಯತ್ವ ಅರ್ಜಿ</h1>
                <h4 className='text-[##191D22] !font-black text-center md:block hidden text-md pt-3'>KOFA ಸಂಸ್ಥೆ ಸದಸ್ಯರ ಪ್ರಯೋಜನಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ ಹಾಗೂ ಸಂಸ್ಥೆಯ ಸೇವೆಗಳ ಸುಧಾರಣೆಗೆ ಸಹಕಾರಿಯಾಗುತ್ತದೆ.</h4>
                <h4 className='text-[#191D22]  text-center md:hidden font-semibold'>ನಿಮ್ಮ ಸದಸ್ಯತ್ವವನ್ನು ಮುಂದುವರಿಸಲು
                    ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿಮಾಡಿ</h4>
                <div className='md:flex justify-center gap-4 hidden'>
                    <img src={Money}  />
                    <h6 className='text-[#F69F00] font-black text-center text-md py-4'> KOFA ಸಂಸ್ಥೆ ₹100 ನ ನಿಗದಿತ ಶುಲ್ಕಕ್ಕೆ ಸದಸ್ಯತ್ವವನ್ನು ನೀಡುತ್ತದೆ.</h6>
                </div>
                <div className='flex justify-center items-center'>
                    <form className='md:w-[85%]'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-20 py-6'>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ಹೆಸರು</label>
                                <input placeholder='ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' className='!px-2 w-full rounded-md border border-[#7F7F7F] bg-white ps-10 h-[35px] text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                                <input placeholder='ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ' className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='flex gap-6'>
                                <div>
                                    <label className="mb-1 block  text-xs font-black text-[#222225]">ವಯಸ್ಸು</label>
                                    <input placeholder='ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ' className='!px-2 h-[35px]  w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                                </div>
                                <div>
                                    <label className="mb-1 block  text-xs font-black text-[#222225]">ಲಿಂಗ</label>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <div className='h-[30px] flex  justify-center items-center'>
                                            <input type='radio' id='male' name='gender' className='px-2 h-[35px] ' />
                                            <label for="male" htmlFor='male' className="mb-1 mx-2 block  text-xs font-black text-[#222225] cursor-pointer" >
                                                ಪುರುಷ</label>
                                        </div>
                                        <div className='h-[30px] flex justify-center items-center'>
                                            <input type='radio' name='gender' id='female' className='ox-2 h-[35px]' />
                                            <label htmlFor='female' className="mb-1 block  text-xs font-black text-[#222225] cursor-pointer mx-2">
                                                ಸ್ತ್ರೀ</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ವಿಳಾಸ</label>
                                <input placeholder='ನಿಮ್ಮ ಪೂರ್ಣ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ' className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block text-xs font-black text-[#222225]">
                                    ಜಿಲ್ಲೆ
                                </label>
                                <select defaultValue="" className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                                    <option value="">ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ</option>
                                    <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                                    <option value="ಗಡಗ">ಗಡಗ</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">
                                    ತಾಲೂಕು
                                </label>
                                <select defaultValue="" className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                                    <option value="">ಎಲ್ಲಾ ತಾಲೂಕು</option>
                                    <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                                    <option value="ಹುಬ್ಬಳ್ಳಿ">ಹುಬ್ಬಳ್ಳಿ</option>
                                    <option value="ಗಡಗ">ಗಡಗ</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">
                                    ಊರು
                                </label>
                                <select defaultValue="" className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                                    <option value="">ನಿಮ್ಮ ಊರನ್ನು ನಮೂದಿಸಿ</option>
                                    <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                                    <option value="ಹುಬ್ಬಳ್ಳಿ">ಹುಬ್ಬಳ್ಳಿ</option>
                                    <option value="ಗಡಗ">ಗಡಗ</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs  font-black text-[#222225]">ನೀವು ಎಷ್ಟು ಎಕರೆಯಲ್ಲಿ ಈರುಳ್ಳಿ ಬೆಳೆದಿದ್ದೀರಾ?</label>
                                <input placeholder='ಎಕರೆಗಳಲ್ಲಿ ನಮೂದಿಸಿ' className='!px-2 h-[35px]  w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>

                        </div>
                        <div className='md:hidden justify-center gap-2 flex '>
                            <img src={Money} />
                            <h6 className='text-[#F69F00] font-black text-center text-xs pt-2'> ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ರೂ.100 ಕ್ಕೆ ನಿಗದಿಯಾಗಿದೆ</h6>
                        </div>
                        <div className='md:flex justify-between items-center gap-4 py-2'>
                            <div className='flex '>
                                <input type="checkbox" className='px-2 mx-2  py-3 transform scale-150 mr-4' />
                                <label className="mb-1 hidden md:block text-[10px] font-black text-[#7F7F7F]"> ಸದಸ್ಯತ್ವದ ಪ್ರಯೋಜನಗಳು KOFA ಸಂಸ್ಥೆಯ ನೀತಿಗಳ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದೆಂಬುದನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.</label>
                                <label className="mb-1 block md:hidden text-[10px] font-black text-[#7F7F7F]"> ಈ ಫಾರ್ಮ್ ಸಲ್ಲಿಸುವ ಮೂಲಕ, ನೀವು ಕೆಳಗಿನ ನಿಯಮಗಳು
                                    ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಒಪ್ಪುತ್ತೀರಿ.</label>
                            </div>
                            <div className=' my-2'>
                                <button className='w-full md:w-auto h-[30px] !rounded-full !font-black text-[12px] !px-12 inline-flex items-center justify-center  py-2 text-sm  transition-colors bg-[#166932]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white'>
                                    ಸಲ್ಲಿಸಿ
                                </button>
                            </div>
                            <div className=' my-3 md:hidden flex '>
                                <button className='!bg-transparent border-2 border-[#680D3A] w-full md:w-auto h-[30px] !rounded-full !font-black text-[12px] text-[#680D3A] inline-flex items-center justify-center px-4 py-2 text-sm  transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                                    <img src={iconBack} className='h-[20px] mx-2' /> ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MembersReg
