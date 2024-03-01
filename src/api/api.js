import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  header: {
    'Content-Type': 'application/json'
  }
});

//api목록 가져오기
export const getReview = async () => {
  const { data } = await apiClient.get('/');
  return data;
};

//review 추가하기
export const createReview = async (item) => {
  const { data } = await apiClient.post('/', item);
  return data;
};

//review 삭제하기
export const deleteReview = async (id) => {
  await apiClient.delete(`/${id}`);
  return id;
};

//review 수정하기
export const updateReview = async (id, review) => {
  await apiClient.patch(`/${id}`, review);
};
