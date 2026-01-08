
// import { useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.svg'

const TopBar = () => {

    return (
        <header className="flex items-center justify-between border-b border-gray-100 px-2 md:px-6 py-4 bg-[#FCFCFC] shadow-lg">
            <div className='h-[100px] w-80'>
                {/* <h1 className="text-lg font-semibold text-[#222225]">{} </h1> */}
                <img src={Logo} className='h-full w-full' />
            </div>
            <div className=' my-3 md:block hidden  mx-20'>
                <button className='!bg-transparent border-2 border-[#680D3A] w-full md:w-auto h-[30px] !rounded-full !font-black  text-[#680D3A] inline-flex items-center justify-center px-6 py-4 text-sm  transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                    ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ
                </button>
            </div>
        </header>
    )
}

export default TopBar
