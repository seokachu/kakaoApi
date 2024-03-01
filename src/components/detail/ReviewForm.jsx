import { useState } from 'react';

const ReviewForm = () => {
  //Custom Hook
  const initialState = {
    password: '',
    nickname: '',
    title: '',
    content: ''
  };
  const [formState, setFormState] = useState(initialState);

  const { nickname, title, content, password } = formState;
  // console.log('nickname', nickname);
  // console.log('title', title);
  // console.log('content', content);
  // console.log('password', password);
  const onChangeHandler = (e) => {
    const { name, value } = e.target; //아래 return 태그에서 name,value값을 가지고 오는것
    //객체 6~9번째줄 가지고 오는것 [name]은 return부분name, value는 return문 아래 선언해준 value값을 가지고 오는것
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandeler = (e) => {
    e.preventDefault();
    setFormState(initialState);
    alert('입력되었습니다.');
  };

  return (
    <form onSubmit={onSubmitHandeler}>
      <input name="title" value={title} onChange={onChangeHandler} type="text" placeholder="제목을 입력해 주세요" />
      <textarea name="content" value={content} onChange={onChangeHandler} placeholder="내용을 입력해 주세요" />
      <input name="nickname" value={nickname} onChange={onChangeHandler} type="text" placeholder="닉네임 입력" />
      <input name="password" value={password} onChange={onChangeHandler} type="password" placeholder="패스워드 입력" />
      <button>입력하기</button>
    </form>
  );
};

export default ReviewForm;
