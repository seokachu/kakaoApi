import { toast } from 'react-toastify';
import inputForm from '../hooks/inputForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '../../api/api';
import uuid from 'react-uuid';
import { useParams } from 'react-router';
import { getFormattedDate } from '../../util/date';

const ReviewForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { formState, onChangeHandler, resetForm } = inputForm({
    password: '',
    nickname: '',
    title: '',
    content: ''
  });

  const { nickname, title, content, password } = formState;

  //data내용 불러오기(api) mutation CUD (create)
  const mutation = useMutation({
    mutationFn: (item) => createReview(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  //게시글 작성하기
  const onSubmitHandeler = (e) => {
    e.preventDefault();
    const date = new Date();
    if (validation()) {
      const newReview = {
        id: uuid(),
        place_id: id,
        title,
        content,
        nickname,
        password,
        createAt: getFormattedDate(date)
      };
      mutation.mutate(newReview);
      resetForm();
      toast.success('입력되었습니다');
    }
  };

  //validation
  const validation = () => {
    if (!title.trim()) {
      toast.error('제목을 입력해 주세요');
      return;
    }
    if (!content.trim()) {
      toast.error('내용을 입력해 주세요');
      return;
    }
    if (!nickname.trim()) {
      toast.error('닉네임을 입력해 주세요');
      return;
    }
    if (!password.trim()) {
      toast.error('패스워드를 입력해 주세요');
      return;
    }
    return true;
  };

  return (
    <form onSubmit={onSubmitHandeler}>
      <input
        name="title"
        value={title}
        onChange={onChangeHandler}
        type="text"
        placeholder="제목을 입력해 주세요"
        autoFocus
      />
      <textarea name="content" value={content} onChange={onChangeHandler} placeholder="내용을 입력해 주세요" />
      <input name="nickname" value={nickname} onChange={onChangeHandler} type="text" placeholder="닉네임 입력" />
      <input name="password" value={password} onChange={onChangeHandler} type="password" placeholder="패스워드 입력" />
      <button type="submit">입력하기</button>
    </form>
  );
};

export default ReviewForm;
