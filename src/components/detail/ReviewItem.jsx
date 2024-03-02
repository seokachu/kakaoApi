import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateReview } from '../../api/api';
// import { useState } from 'react';
import { getFormattedDate } from '../../util/date';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import EditingForm from '../../components/hooks/EditForm';

const ReviewItem = ({ review }) => {
  const queryClient = useQueryClient();
  const { id, place_id, nickname, password, title, content, createAt } = review;

  //수정 state
  const { editingState, setEditingState, editingValue, setEditingValue, onEditingHandler, resetForm } = EditingForm({
    nickname,
    title,
    content
  });

  //react-query client
  //삭제 mutate
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  //수정 mutate
  const { mutate: editMutate } = useMutation({
    mutationFn: async ({ id, review }) => {
      await updateReview(id, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  //삭제하기 btn
  const onDeleteHander = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteMutate(id);
      alert('삭제되었습니다.');
    }
  };

  //수정하기 btn
  const onEditDone = () => {
    if (validation()) {
      console.log(review.id);
      console.log(editingValue.title);
      console.log(editingValue.content);
      editMutate({ id: review.id, review: { title: editingValue.title, content: editingValue.content } });

      alert('수정되었습니다');
      setEditingState(false);
      resetForm();
      console.log(editingValue);
    }
  };

  //수정 벨리데이션
  const validation = () => {
    if (title === editingValue.title) {
      toast.error('제목 수정 내용이 없습니다.');
      return false;
    }
    if (content === editingValue.content) {
      toast.error('내용 수정 내용이 없습니다.');
      return false;
    }
    return true;
  };

  //취소버튼 클릭
  const onClickCancel = () => {
    setEditingState(false);
    // resetForm();
  };

  //수정버튼 클릭
  const onEditClick = () => {
    setEditingValue({
      title,
      content
    });
    setEditingState(true);
  };

  //패스워드 확인 핸들러
  // const onCheckPasswordHander = () => {
  //   if(password === editingPassword)
  // };

  return (
    <li>
      <div>
        <div>
          <h2>닉네임:{nickname}</h2>
          <time>{createAt}</time>
        </div>
        <div>
          {editingState ? (
            <>
              <input type="text" name="title" value={editingValue.title} onChange={onEditingHandler} />
              <textarea name="content" value={editingValue.content} onChange={onEditingHandler} />
            </>
          ) : (
            <>
              <p>제목:{title}</p>
              <p>내용:{content}</p>
            </>
          )}
        </div>
        {editingState ? (
          <div>
            <button onClick={onClickCancel}>취소</button>
            <button onClick={onEditDone}>수정완료</button>
          </div>
        ) : (
          <div>
            <button onClick={onEditClick}>수정</button>
            <button onClick={onDeleteHander}>삭제</button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ReviewItem;
