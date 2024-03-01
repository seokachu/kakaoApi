const ReviewItem = ({ review }) => {
  console.log(review);
  const { id, place_id, nickname, password, title, content, createAt } = review;
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
      </div>
    </li>
  );
};

export default ReviewItem;
