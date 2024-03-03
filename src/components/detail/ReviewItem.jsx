import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview, updateReview } from '../../api/api';
import { toast } from 'react-toastify';
import EditingForm from '../../components/hooks/EditForm';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const ReviewItem = ({ review }) => {
  const queryClient = useQueryClient();
  const { id, place_id, nickname, password, title, content, createAt } = review;

  const [isVisible, setIsVisible] = useState(false);
  const passwordRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // 상태를 변경하여 컴포넌트의 가시성을 토글합니다.
  };
  console.log(isVisible);

  //수정 state
  const {
    editingState,
    setEditingState,
    editingValue,
    setEditingValue,
    onEditingHandler,
    resetForm,
    editingInputPassword,
    setEditingInputPassword,
    modeEditAndDelete,
    setModeEditAndDelete
  } = EditingForm({
    nickname,
    title,
    content,
    password
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

  //패스워드 확인
  const onCheckPasswordHander = () => {
    //처음에 사용자가 빈문자열로 넣었는지 먼저 확인해줌
    if (editingValue.password.trim() === '') {
      toast.error('비밀번호를 입력해 주세요');
      return false;
    }

    if (editingState && password === editingValue.password) {
      modeEditAndDelete ? onDeleteHander() : onEditPassHander();
      return;
    }
    toast.error('비밀번호가 일치하지 않습니다');
  };

  //삭제하기 btn
  const onDeleteHander = () => {
    //패스워드 확인내용 거치고 수정모드로 전환
    setModeEditAndDelete(true);
    toggleVisibility(false);
    //수정상태
    if (editingState) {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        deleteMutate(id);
        alert('삭제되었습니다.');
      } else {
        toast.error('삭제가 취소되었습니다.');
      }
    } else {
      // 수정 상태가 아닌 경우, 패스워드 초기화
      setEditingState(true);
      setEditingValue((prev) => ({ ...prev, password: '' }));
    }
  };

  //수정하기 btn
  const onEditPassHander = () => {
    //패스워드 거치고 수정상태로 전환
    if (editingState) {
      setModeEditAndDelete(false);
      setEditingInputPassword(true);
    }
  };

  //수정완료 버튼
  const onEditDone = () => {
    if (editingState && validation()) {
      editMutate({ id: review.id, review: { title: editingValue.title, content: editingValue.content } });
      // setEditingValue({
      //   title,
      //   content
      // });
      alert('수정되었습니다');
      setEditingInputPassword(false);
      setEditingState(false);
      setModeEditAndDelete(false);
    }
  };
  //수정모드중 취소버튼
  const onEditCancel = () => {
    setEditingState(false);
    resetForm();
    setModeEditAndDelete(false);
    setEditingInputPassword(false);
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

  //비밀번호 취소버튼 클릭
  const onClickCancel = () => {
    setEditingState(false);
    resetForm();
    setModeEditAndDelete(false);
  };

  //수정버튼 클릭시
  const onEditClick = () => {
    //패스워드 이전상태를 가져와서(복사해서) 새로운 상태로 업데이트(공백으로 지움)
    setEditingValue((prev) => ({ ...prev, password: '' }));
    setEditingState(true);
  };

  return (
    <li>
      <>
        <div>
          <h2>닉네임:{nickname}</h2>
          <time>{createAt}</time>
        </div>
        <div>
          {/* 비밀번호가 일치하면 인풋창으로 바뀜 (true) */}
          {editingInputPassword ? (
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
        {/* 수정버튼을 클릭하면? 패스워드가 나옴 */}
        {editingState ? (
          <PasswordField ref={passwordRef} visible={isVisible ? 'true' : 'false'}>
            <input
              type="password"
              name="password"
              value={editingValue.password}
              onChange={onEditingHandler}
              placeholder="비밀번호를 입력해 주세요"
            />
            <button onClick={onCheckPasswordHander}>비밀번호 확인</button>
            <button onClick={onClickCancel}>취소</button>
          </PasswordField>
        ) : (
          <div>
            <button onClick={onEditClick}>수정</button>
            <button onClick={onDeleteHander}>삭제</button>
          </div>
        )}
        {/* 수정버튼을 누르고 패스워드가 맞으면? 버튼부분이 취소,수정완료 버튼이 나옴*/}
        {editingInputPassword ? (
          <div>
            <button onClick={onEditCancel}>취소</button>
            <button onClick={onEditDone}>수정완료</button>
          </div>
        ) : null}
      </>
    </li>
  );
};

export default ReviewItem;

const PasswordField = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;
