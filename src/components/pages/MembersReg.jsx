import React, { useState } from 'react'

import Money from '../../assets/Money.svg';
import iconBack from '../../assets/lets-icons_back.svg';
import { useNavigate } from 'react-router-dom';
import {
    createMembershipOrder,
    verifyPayment
} from '../../services/payments';


function MembersReg() {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        mobile: '',
        gender: '',
        age: '',
        acres: '',
        address: '',
        district: '',
        taluk: '',
        village: ''
    });
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const applicationData = {
                name: { kn: '', en: form.name },
                gender: form.gender,
                mobile: form.mobile,
                ...(form.age && { age: Number(form.age) }),
                acres: Number(form.acres),
                location: {
                    district: { kn: form.district, en: '' },
                    taluk: { kn: form.taluk, en: '' },
                    village: { kn: form.village, en: '' }
                },
                address: {
                    line1: { kn: form.address, en: '' },
                    line2: { kn: '', en: '' },
                    pincode: ''
                }
            };
            const apiResponse = await createMembershipOrder({
                applicationData
            });
            if (!apiResponse?.data) {
                throw new Error("Invalid response from payment API");
            }

            const {
                orderId,
                razorpayKeyId,
                amount,
                applicationId
            } = apiResponse.data;

            /* 🔥 OPEN RAZORPAY */
            openRazorpay({
                orderId,
                razorpayKeyId,
                amount,
                applicationId
            });

        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    /* ============================================================
       🔥 RAZORPAY HANDLER
       ============================================================ */
    const openRazorpay = ({
        orderId,
        razorpayKeyId,
        amount,
        applicationId
    }) => {
        const options = {
            key: razorpayKeyId,
            amount,
            currency: "INR",
            order_id: orderId,

            handler: async function (response) {
                try {
                    /* 🔥 VERIFY PAYMENT */
                    await verifyPayment({
                        applicationId,
                        type: "membership",
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });

                    /* 🔥 NAVIGATE ONLY AFTER SUCCESS */
                    navigate(`/payment-success/${applicationId}`);


                    setForm({
                        name: '',
                        mobile: '',
                        gender: '',
                        age: '',
                        acres: '',
                        address: '',
                        district: '',
                        taluk: '',
                        village: ''
                    });
                    setAccepted(false);

                } catch (err) {
                    alert("Payment verification failed");
                }
            },

            theme: { color: "#166932" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    return (
        <>
            <div className='px-6'>
                <h1 className='text-[#166932] text-[40px] md:text-3xl font-black text-center py-6 md:py-8'>ಸದಸ್ಯತ್ವ ಅರ್ಜಿ</h1>
                <h4 className='text-[##191D22] !font-black text-center md:block hidden text-md pt-3'>KOFA ಸಂಸ್ಥೆ ಸದಸ್ಯರ ಪ್ರಯೋಜನಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ ಹಾಗೂ ಸಂಸ್ಥೆಯ ಸೇವೆಗಳ ಸುಧಾರಣೆಗೆ ಸಹಕಾರಿಯಾಗುತ್ತದೆ.</h4>
                <h4 className='text-[#191D22]  text-center md:hidden font-semibold'>ನಿಮ್ಮ ಸದಸ್ಯತ್ವವನ್ನು ಮುಂದುವರಿಸಲು
                    ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿಮಾಡಿ</h4>
                <div className='md:flex justify-center gap-4 hidden'>
                    <img src={Money} />
                    <h6 className='text-[#F69F00] font-black text-center text-md py-4'> KOFA ಸಂಸ್ಥೆ ₹100 ನ ನಿಗದಿತ ಶುಲ್ಕಕ್ಕೆ ಸದಸ್ಯತ್ವವನ್ನು ನೀಡುತ್ತದೆ.</h6>
                </div>
                <div className='flex justify-center items-center'>
                    <form className='md:w-[85%]' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-20 py-6'>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ಹೆಸರು</label>
                                <input value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder='ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'
                                    className='!px-2 w-full rounded-md border border-[#7F7F7F] bg-white ps-10 h-[35px] text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                                <input value={form.mobile}
                                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                    placeholder='ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ'
                                    className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='flex gap-6'>
                                <div>
                                    <label className="mb-1 block  text-xs font-black text-[#222225]">ವಯಸ್ಸು</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="120"
                                        value={form.age}
                                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                                        placeholder='ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ' className='!px-2 h-[35px]  w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                                </div>
                                <div>
                                    <label className="mb-1 block  text-xs font-black text-[#222225]">ಲಿಂಗ</label>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <div className='h-[30px] flex  justify-center items-center'>
                                            <input type='radio' id='male' name='gender' value="male"
                                                checked={form.gender === 'male'}
                                                onChange={(e) =>
                                                    setForm({ ...form, gender: e.target.value })
                                                }
                                                className='px-2 h-[35px] ' />
                                            <label htmlFor="male" className="mb-1 mx-2 block  text-xs font-black text-[#222225] cursor-pointer" >
                                                ಪುರುಷ</label>
                                        </div>
                                        <div className='h-[30px] flex justify-center items-center'>
                                            <input type='radio' name='gender' id='female' value="female"
                                                checked={form.gender === 'female'}
                                                onChange={(e) =>
                                                    setForm({ ...form, gender: e.target.value })
                                                }
                                                className='ox-2 h-[35px]' />
                                            <label htmlFor='female' className="mb-1 block  text-xs font-black text-[#222225] cursor-pointer mx-2">
                                                ಸ್ತ್ರೀ</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">ವಿಳಾಸ</label>
                                <input
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    placeholder='ನಿಮ್ಮ ಪೂರ್ಣ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ' className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block text-xs font-black text-[#222225]">
                                    ಜಿಲ್ಲೆ
                                </label>
                                <select
                                    value={form.district}
                                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                                    className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                                    <option value="">ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ</option>
                                    <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                                    <option value="ಗಡಗ">ಗಡಗ</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs font-black text-[#222225]">
                                    ತಾಲೂಕು
                                </label>
                                <select
                                    value={form.taluk}
                                    onChange={(e) => setForm({ ...form, taluk: e.target.value })}
                                    className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
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
                                <select
                                    value={form.village}
                                    onChange={(e) => setForm({ ...form, village: e.target.value })}
                                    className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                                    <option value="">ನಿಮ್ಮ ಊರನ್ನು ನಮೂದಿಸಿ</option>
                                    <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                                    <option value="ಹುಬ್ಬಳ್ಳಿ">ಹುಬ್ಬಳ್ಳಿ</option>
                                    <option value="ಗಡಗ">ಗಡಗ</option>
                                </select>
                            </div>
                            <div className='w-[100%]'>
                                <label className="mb-1 block  text-xs  font-black text-[#222225]">ನೀವು ಎಷ್ಟು ಎಕರೆಯಲ್ಲಿ ಈರುಳ್ಳಿ ಬೆಳೆದಿದ್ದೀರಾ?</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.acres}
                                    onChange={(e) => setForm({ ...form, acres: e.target.value })}
                                    placeholder='ಎಕರೆಗಳಲ್ಲಿ ನಮೂದಿಸಿ' className='!px-2 h-[35px]  w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
                            </div>

                        </div>
                        <div className='md:hidden justify-center gap-2 flex '>
                            <img src={Money} />
                            <h6 className='text-[#F69F00] font-black text-center text-xs pt-2'> ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ರೂ.100 ಕ್ಕೆ ನಿಗದಿಯಾಗಿದೆ</h6>
                        </div>
                        <div className='md:flex justify-between items-center gap-4 py-2'>
                            <div className='flex '>
                                <input type="checkbox" checked={accepted}
                                    onChange={(e) => setAccepted(e.target.checked)}
                                    className='px-2 mx-2  py-3 transform scale-150 mr-4' />
                                <label className="mb-1 hidden md:block text-[10px] font-black text-[#7F7F7F]"> ಸದಸ್ಯತ್ವದ ಪ್ರಯೋಜನಗಳು KOFA ಸಂಸ್ಥೆಯ ನೀತಿಗಳ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದೆಂಬುದನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.</label>
                                <label className="mb-1 block md:hidden text-[10px] font-black text-[#7F7F7F]"> ಈ ಫಾರ್ಮ್ ಸಲ್ಲಿಸುವ ಮೂಲಕ, ನೀವು ಕೆಳಗಿನ ನಿಯಮಗಳು
                                    ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಒಪ್ಪುತ್ತೀರಿ.</label>
                            </div>
                            <div className=' my-2'>
                                <button
                                    type="submit"
                                    disabled={!accepted || loading}
                                    className={`w-full md:w-auto h-[30px] !rounded-full !font-black text-[12px] !px-12 inline-flex items-center justify-center  py-2 text-sm  transition-colors bg-[#166932]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white ${!accepted || loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#166932]"}`}
                                >
                                    {loading ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : 'ಸಲ್ಲಿಸಿ'}
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
