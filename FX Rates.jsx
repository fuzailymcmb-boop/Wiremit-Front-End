import React, { createContext, useEffect, useState } from 'react';

export const FXContext = createContext();

export const FXProvider = ({ children }) => {
  const [rates, setRates] = useState({ GBP: 0, ZAR: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS')
      .then(res => res.json())
      .then(data => {
        // data is an array of objects like [{USD:1}, {GBP:0.74}, {ZAR:17.75}, ...]
        const fxRates = {};
        data.forEach(rateObj => {
          const [currency, rate] = Object.entries(rateObj)[0];
          if (currency === 'GBP' || currency === 'ZAR') {
            fxRates[currency] = rate;
          }
        });
        setRates(fxRates);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <FXContext.Provider value={{ rates, loading }}>
      {children}
    </FXContext.Provider>
  );
};
