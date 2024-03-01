import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const ReviewItem = ({ review }) => {
  const queryClient = useQueryClient();
  const { id, place_id, nickname, password, title, content, createAt } = review;

  //삭제하기
  const onDeleteHander = () => {
    
  };

  //수정하기

  return (
    <li>
      <div>
        <div>
          <h2>닉네임:{nickname}</h2>
          <time>{createAt}</time>
        </div>
        <div>
          <p>제목:{title}</p>
          <p>내용:{content}</p>
        </div>
        <div>
          <button>수정</button>
          <button onClick={onDeleteHander}>삭제</button>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
