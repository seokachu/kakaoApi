const { useState } = from 'react';

const useForm = (initialState = {}) =>{
  const [formState, setFormState] = useState(initialState);

  const onChangeHander= (e) => {
    const {nickName, title, content, password} = e.target;
    setFormState((prev)=>({...prev, [nickName]:value }))
  }

  const resetForm = () => {
    setFormState(initialState);
};


return { formState, onChangeHander, resetForm };


}