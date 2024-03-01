import axios from 'axios';

// const baseURL = 'http://localhost:4000/review';

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  header: {
    'Content-Type': 'application/json'
  }
});

//api목록 가져오기
export const getReview = async () => {
  const { data } = await apiClient.get('/review');
  return data;
};

// //추가하기
// export const createTodo = async (todo) => {
//   const { data } = await apiClient.post('/', todo);
//   return data;
// };

// //삭제하기
// export const deleteTodo = async (id) => {
//   await apiClient.delete(`/${id}`);
//   return id;
// };

// //수정하기
// export const updateTodo = async (id, todo) => {
//   await apiClient.patch(`/${id}`, todo);
//   return id;
// };
