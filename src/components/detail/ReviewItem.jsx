import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateReview } from '../../api/api';
import { useState } from 'react';
import { getFormattedDate } from '../../util/date';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';

const ReviewItem = ({ review }) => {
  const queryClient = useQueryClient();
  const { id, place_id, nickname, password, title, content, createAt } = review;

  //수정 state
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(content);
  const [editingTitle, setEditingTitle] = useState(title);
  const [editingPassword, setEditingPassword] = useState('');

  //react-query client
  //삭제 mutate
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  //수정mutate
  const { mutate: editMutate } = useMutation({
    mutationFn: (id, review) => updateReview(id, review),
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
      
      editMutate(id, review);
    }
  };

  const validation = () => {
    if (title === editingTitle) {
      toast.error('제목 수정 내용이 없습니다.');
      return;
    }
    if (content === editingTitle) {
      toast.error('내용 수정 내용이 없습니다.');
    }
  };

  //패스워드 확인 핸들러
  // const onCheckPasswordHander = () => {
  //   if(password === editingPassword)
  // };

  return (
    <>
      <li>
        <div>
          <div>
            <h2>닉네임:{nickname}</h2>
            <time>{createAt}</time>
          </div>
          <div>
            {isEditing ? (
              <>
                <input type="text" value={editingTitle} />
                <textarea value={editingText} />
              </>
            ) : (
              <>
                <p>제목:{title}</p>
                <p>내용:{content}</p>
              </>
            )}
          </div>
          {isEditing ? (
            <div>
              <button onClick={() => setIsEditing(false)}>취소</button>
              <button onClick={onEditDone}>수정완료</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={onDeleteHander}>삭제</button>
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default ReviewItem;
