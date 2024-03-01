const ReviewItem = ({ review }) => {
  console.log(review);
  const { id, place_id, nickname, password, title, content, createAt } = review;
  return (
    <li>
      <div>
        <p>{id}</p>
        <p>{place_id}</p>
        <p>{nickname}</p>
        <p>{title}</p>
        <p>{content}</p>
        <p>{createAt}</p>
        <p>{password}</p>
      </div>
    </li>
  );
};

export default ReviewItem;
