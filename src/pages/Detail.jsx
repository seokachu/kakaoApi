import { useParams } from 'react-router';
import ReviewForm from '../components/detail/ReviewForm';
import ReviewList from '../components/detail/ReviewList';

const Detail = () => {
  const id = useParams();
  console.log(id);

  return (
    <main>
      <ReviewForm />
      <ReviewList />
    </main>
  );
};

export default Detail;
