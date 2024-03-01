import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getReview } from '../../api/api';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const { id } = useParams();
  console.log(id);

  const query = useQuery({
    queryKey: ['reviews', id],
    queryFn: getReview //모든 테이터를 불러온다, id밖에 못가져와서
  });

  /*
  해당내용이 성공했을때만 작동하므로 스코프 isSuccess블록안에서만 정의되었기 떄문에 이 블록 내에서만 유효한 거임.
  그래서 return안에 map을 뿌려주려고 할때 filteredReviews에 접근할 수 없음
  그래서 블록 외부에서 선언해해주는게 좋음
  아니면 리턴문에 if isSuccess를 적어줘야하는데 그럼 3항연산자로 길어지니까 그냥 이렇게 빈 배열로 두면 됨
  */
  let filteredReviews = [];
  // console.log(query);
  /*
  전체데이터를 가져와서 해당내용 place_id만 가져올 수 있게 찾음(필터링)
  해당 내용이 비동기 이기 때문에 isSuccess요청을 성공하면 데이터를 불러와서 찾을 수 있게 만듬. {}(find)사용
  filter을 쓰면 [{}] 배열안에 객체로 나오기 때문에 find로 사용
  */

  if (query.isSuccess) {
    filteredReviews = query.data.filter((item) => item.place_id === id);
    console.log(filteredReviews);
  }

  if (query.isLoading) {
    return <div>로딩중입니다! 조금만 기다려 주세요.</div>;
  }

  if (query.isError) {
    console.log('Error:', query.isError);
  }

  return (
    <ul>
      {filteredReviews.map((item) => (
        <ReviewItem key={item.id} review={item} />
      ))}
    </ul>
  );
};

export default ReviewList;
