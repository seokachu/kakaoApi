import { useState } from 'react';
import { toast } from 'react-toastify';
import detailForm from '../../components/hooks/detailForm';
import { useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { createReview } from '../../api/api';

const ReviewForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { formState, onChangeHandler, resetForm } = detailForm({
    password: '',
    nickname: '',
    title: '',
    content: ''
  });

  const { nickname, title, content, password } = formState;

  const date = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  //data내용 불러오기(api)
  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  //게시글 작성하기
  const onSubmitHandeler = (e) => {
    e.preventDefault();
    resetForm();
    toast.success('입력되었습니다');
    mutation.mutate({
      id: crypto.randomUUID(),
      title: 'Do Laundry'
    });
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
