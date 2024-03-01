import axios from 'axios';

//.env작성 마지막에
//import.meta.env.[변수명]으로 선언해야한다!!!
// const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
const baseURL = 'http://localhost:4000/todos';

export const apiClient = axios.create({
  baseURL,
  header: {
    'Content-Type': 'application/json'
  }
});

//api목록 가져오기
export const getTodos = async () => {
  const { data } = await apiClient.get('/');
  return data;
};

//특정 ID의 상세 정보 가져오기
export const getSingleTodo = async (id) => {
  const { data } = await apiClient.get(`/${id}`);
  return data;
};

//추가하기
export const createTodo = async (todo) => {
  const { data } = await apiClient.post('/', todo);
  return data;
};

//삭제하기
export const deleteTodo = async (id) => {
  await apiClient.delete(`/${id}`);
  return id;
};

//수정하기
export const updateTodo = async (id, todo) => {
  await apiClient.patch(`/${id}`, todo);
  return id;
};
