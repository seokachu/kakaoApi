import { useState } from 'react';

const inputForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  const onChangeHandler = (e) => {
    const { name, value } = e.target; //아래 return 태그에서 name,value값을 가지고 오는것
    //객체 6~9번째줄 가지고 오는것 [name]은 return부분name, value는 return문 아래 선언해준 value값을 가지고 오는것
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, resetForm };
};

export default inputForm;
