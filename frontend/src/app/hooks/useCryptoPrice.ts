import {useState, useEffect} from 'react';
import axiosCrypto from '@/utils/axiosCrypto';

const useCryptoPrice = (symbol: any) => {
  const [price, setPrice] = useState(null);
  const [loadingCrypto, setLoadingCrypto] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return; // If no symbol is provided, do not fetch

    const fetchPrice = async () => {
      setLoadingCrypto(true);
      try {
        const response = await axiosCrypto.get(
          `/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`,
        );
        setPrice(response.data.price);
        setError(null);
      } catch (err) {
        setPrice(null);
      } finally {
        setLoadingCrypto(false);
      }
    };

    fetchPrice();
  }, [symbol]);

  return {price, loadingCrypto, error};
};

export default useCryptoPrice;
