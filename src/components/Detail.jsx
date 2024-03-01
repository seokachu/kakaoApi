import { useParams } from 'react-router';

const Detail = () => {
  const id = useParams();
  console.log(id);

  return <div>디테일페이지입니다.</div>;
};

export default Detail;
