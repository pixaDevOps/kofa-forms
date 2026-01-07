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

  // ✅ Backend-required structure (UI-safe)
  const formatDataForBackend = () => ({
    amount: Number(formData.amount),
    applicationData: {
      name: { kn: formData.name, en: formData.name },
      fatherName: { kn: 'NA', en: 'NA' },
      gender:
        formData.gender === 'ಪುರುಷ'
          ? 'male'
          : formData.gender === 'ಸ್ತ್ರೀ'
          ? 'female'
          : '',
      mobile: formData.mobile,
      location: {
        district: { kn: formData.district, en: formData.district },
        taluk: { kn: formData.taluk, en: formData.taluk },
        village: { kn: 'NA', en: 'NA' }
      },
      address: {
        line1: { kn: formData.address, en: formData.address },
        line2: { kn: '', en: '' },
        pincode: '000000'
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert('ದಯವಿಟ್ಟು ನಿಯಮಗಳಿಗೆ ಒಪ್ಪಿಕೊಳ್ಳಿ');
      return;
    }

    setLoading(true);

    try {
      const payload = formatDataForBackend();
      const order = await createDonationOrder(payload);

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Razorpay SDK load failed');

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'KOFA',
        description: 'Donation',
        order_id: order.orderId,
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="ಹೆಸರು" value={formData.name} onChange={handleChange} required />
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
      <input name="amount" type="number" placeholder="ದೇಣಿಗೆ ಮೊತ್ತ" value={formData.amount} onChange={handleChange} required />

      <label>
        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
        ನಿಯಮಗಳಿಗೆ ಒಪ್ಪುತ್ತೇನೆ
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'ಸಂಸ್ಕರಣೆ...' : 'ಸಲ್ಲಿಸಿ'}
      </button>
    </form>
  );
};

export default DonationReg;
