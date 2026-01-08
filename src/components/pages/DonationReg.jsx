import { useState } from 'react';
import { createDonationOrder, verifyPayment } from '../../services/payments';
import { loadRazorpay } from '../../utils/loadRazorpay';

const DonationReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    age: '',
    gender: '',
    address: '',
    district: '',
    taluk: '',
    amount: '',
    termsAccepted: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  //  Backend-required structure (UI-safe)
  // const formatDataForBackend = () => ({
  //   amount: Number(formData.amount),
  //   applicationData: {
  //     name: { kn: formData.name, en: formData.name },
  //     fatherName: { kn: 'NA', en: 'NA' },
  //     gender:
  //       formData.gender === 'ಪುರುಷ'
  //         ? 'male'
  //         : formData.gender === 'ಸ್ತ್ರೀ'
  //           ? 'female'
  //           : '',
  //     mobile: formData.mobile,
  //     location: {
  //       district: { kn: formData.district, en: formData.district },
  //       taluk: { kn: formData.taluk, en: formData.taluk },
  //       village: { kn: 'NA', en: 'NA' }
  //     },
  //     address: {
  //       line1: { kn: formData.address, en: formData.address },
  //       line2: { kn: '', en: '' },
  //       pincode: '000000'
  //     }
  //   }
  // });
  const formatDataForBackend = () => ({
    amount: Number(formData.amount),

    applicationData: {
      type: "donation",

      name: {
        kn: formData.name || "",
        en: formData.name || ""
      },

      fatherName: {
        kn: "NA",
        en: "NA"
      },

      gender:
        formData.gender === "ಪುರುಷ"
          ? "male"
          : formData.gender === "ಸ್ತ್ರೀ"
            ? "female"
            : "other",

      mobile: formData.mobile,

      location: {
        district: {
          kn: formData.district || "",
          en: formData.district || ""
        },
        taluk: {
          kn: formData.taluk || "",
          en: formData.taluk || ""
        },
        village: {
          kn: "NA",
          en: "NA"
        }
      },

      address: {
        line1: {
          kn: formData.address || "",
          en: formData.address || ""
        },
        line2: { kn: "", en: "" },
        pincode: "000000"
      }
    }
  });




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ");
      return;
    }
    if (formData.mobile.length !== 10) {
      alert("ದಯವಿಟ್ಟು 10 ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ");
      return;
    }

    if (!formData.gender) {
      alert("ಲಿಂಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ");
      return;
    }
    if (!formData.address.trim()) {
      alert("ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ");
      return;
    }

    if (!formData.district) {
      alert("ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ");
      return;
    }

    if (!formData.taluk) {
      alert("ತಾಲೂಕನ್ನು ಆಯ್ಕೆ ಮಾಡಿ");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("ಮಾನ್ಯ ದೇಣಿಗೆ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ");
      return;
    }



    if (!formData.termsAccepted) {
      alert('ದಯವಿಟ್ಟು ನಿಯಮಗಳಿಗೆ ಒಪ್ಪಿಕೊಳ್ಳಿ');
      return;
    }

    setLoading(true);

    try {
      const payload = formatDataForBackend();
      const order = await createDonationOrder(payload);
      console.log("ORDER RESPONSE ", order);
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Razorpay SDK load failed');

      const options = {
        //  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        key: order.data.razorpayKeyId,
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'KOFA',
        description: 'Donation',
        order_id: order.data.orderId,
        handler: async (response) => {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donationData: payload
          });

          alert('ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ');

          setFormData({
            name: '',
            mobile: '',
            age: '',
            gender: '',
            address: '',
            district: '',
            taluk: '',
            amount: '',
            termsAccepted: false
          });
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile
        },
        theme: { color: '#166932' }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.message || 'ಪಾವತಿ ವಿಫಲವಾಗಿದೆ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-6'>
      <h1 className='text-[#166932] text-[40px] md:text-3xl font-black text-center py-6 md:py-8'>ದೇಣಿಗೆ ಅರ್ಜಿ</h1>
      <h4 className='text-[##191D22] !font-black text-center md:block hidden text-md pt-3'>KOFA ಸಂಸ್ಥೆ ಸದಸ್ಯರ ಪ್ರಯೋಜನಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ ಹಾಗೂ ಸಂಸ್ಥೆಯ ಸೇವೆಗಳ ಸುಧಾರಣೆಗೆ ಸಹಕಾರಿಯಾಗುತ್ತದೆ.</h4>
      <div className='flex justify-center items-center'>
        <form className='md:w-[85%]' onSubmit={handleSubmit}>

          {/* <input name="name" placeholder="ಹೆಸರು" value={formData.name} onChange={handleChange} required />
        <input name="mobile" placeholder="ಮೊಬೈಲ್" value={formData.mobile} onChange={handleChange} required />
        <input name="age" placeholder="ವಯಸ್ಸು" value={formData.age} onChange={handleChange} />

        <label>
          <input type="radio" name="gender" value="ಪುರುಷ" onChange={handleChange} /> ಪುರುಷ
        </label>
        <label>
          <input type="radio" name="gender" value="ಸ್ತ್ರೀ" onChange={handleChange} /> ಸ್ತ್ರೀ
        </label>

        <input name="address" placeholder="ವಿಳಾಸ" value={formData.address} onChange={handleChange} />
        <input name="district" placeholder="ಜಿಲ್ಲೆ" value={formData.district} onChange={handleChange} />
        <input name="taluk" placeholder="ತಾಲೂಕು" value={formData.taluk} onChange={handleChange} />
         */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-20 py-6'>
            <div className='w-[100%]'>
              <label className="mb-1 block  text-xs font-black text-[#222225]">ಹೆಸರು</label>
              <input placeholder='ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' value={formData.name} onChange={handleChange} required name="name" className='!px-2 w-full rounded-md border border-[#7F7F7F] bg-white ps-10 h-[35px] text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
            </div>
            <div className='w-[100%]'>
              <label className="mb-1 block  text-xs font-black text-[#222225]">ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
              <input placeholder='ಸರಿಯಾದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ' value={formData.mobile} required
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                name="mobile" maxLength={10} type="text" className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light'  />
            </div>
            <div className='flex gap-6'>
              <div>
                <label className="mb-1 block  text-xs font-black text-[#222225]">ವಯಸ್ಸು</label>
                <input placeholder='ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ' name="age"
                  value={formData.age}
                  onChange={handleChange} className='!px-2 h-[35px]  w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
              </div>
              <div>
                <label className="mb-1 block  text-xs font-black text-[#222225]">ಲಿಂಗ</label>
                <div className='flex gap-2 justify-center items-center'>
                  <div className='h-[30px] flex  justify-center items-center'>
                    <input id="male"
                      type="radio"
                      name="gender"
                      value="ಪುರುಷ"
                      checked={formData.gender === "ಪುರುಷ"}
                      onChange={handleChange} className='px-2 h-[35px] ' />
                    <label htmlFor="male" className="mb-1 mx-2 block  text-xs font-black text-[#222225] cursor-pointer" >
                      ಪುರುಷ</label>
                  </div>
                  <div className='h-[30px] flex justify-center items-center'>
                    <input id="female"
                      type="radio"
                      name="gender"
                      value="ಸ್ತ್ರೀ"
                      checked={formData.gender === "ಸ್ತ್ರೀ"}
                      onChange={handleChange} className='ox-2 h-[35px]' />
                    <label htmlFor='female' className="mb-1 block  text-xs font-black text-[#222225] cursor-pointer mx-2">
                      ಸ್ತ್ರೀ</label>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-[100%]'>
              <label className="mb-1 block  text-xs font-black text-[#222225]">ವಿಳಾಸ</label>
              <input placeholder='ನಿಮ್ಮ ಪೂರ್ಣ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ' name="address"
                value={formData.address}
                onChange={handleChange} className='!px-2 h-[35px] w-full rounded-md border border-[#7F7F7F] bg-white ps-10 py-2  text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
            </div>
            <div className='w-[100%]'>
              <label className="mb-1 block text-xs font-black text-[#222225]">
                ಜಿಲ್ಲೆ
              </label>
              <select defaultValue="" name="district"
                value={formData.district}
                onChange={handleChange} className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                <option value="" >ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ</option>
                <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                <option value="ಗಡಗ">ಗದಗ</option>
              </select>
            </div>
            <div className='w-[100%]'>
              <label className="mb-1 block  text-xs font-black text-[#222225]">
                ತಾಲೂಕು
              </label>
              <select defaultValue="" name="taluk"
                value={formData.taluk}
                onChange={handleChange} className='w-full cursor-pointer rounded-md border border-[#7F7F7F] bg-white px-3 py-2 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary-light h-[35px] pt-2'>
                <option value=""> ತಾಲೂಕು</option>
                <option value="ಧಾರವಾಡ">ಧಾರವಾಡ</option>
                <option value="ಹುಬ್ಬಳ್ಳಿ">ಹುಬ್ಬಳ್ಳಿ</option>
                <option value="ಗಡಗ">ಗದಗ</option>
              </select>
            </div>
          </div>
          {/* <input name="amount" type="number" placeholder="ದೇಣಿಗೆ ಮೊತ್ತ" value={formData.amount} onChange={handleChange} required /> */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-20 py-6'>
            <div className='w-[100%]'>
              <label className="mb-1 block  text-xs font-black text-[#222225]">ದೇಣಿಗೆ ಮೊತ್ತ</label>
              <input placeholder='00000' name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required className='!px-2 w-full rounded-md border border-[#7F7F7F] bg-white ps-10 h-[35px] text-sm outline-none
        focus:border-primary focus:ring-2 focus:ring-primary-light' />
            </div>
          </div>
          <div className='md:flex justify-between items-center gap-4 py-2'>
            <div className='flex '>
              <input type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange} className='px-2 mx-2  py-3 transform scale-150 mr-4' />
              <label className="mb-1 hidden md:block text-[10px] font-black text-[#7F7F7F]"> ಸದಸ್ಯತ್ವದ ಪ್ರಯೋಜನಗಳು KOFA ಸಂಸ್ಥೆಯ ನೀತಿಗಳ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದೆಂಬುದನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.</label>

            </div>
            <div className=' my-2'>

              <button type="submit" disabled={loading}

                className='w-full md:w-auto h-[30px] !rounded-full !font-black text-[12px] !px-12 inline-flex items-center justify-center  py-2 text-sm  transition-colors bg-[#166932]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-white'>
                {loading ? 'ಸಂಸ್ಕರಣೆ...' : 'ಸಲ್ಲಿಸಿ'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationReg;
