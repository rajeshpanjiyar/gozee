import { useState } from "react";

const useShareableState = () => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalMins] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  return {
    from,
    setFrom,
    to,
    setTo,
    totalMins,
    setTotalMins,
    totalAmount, 
    setTotalAmount
  };
};

export default useShareableState;
