import { useDispatch } from 'react-redux';
import * as S from '../styles/maplist';
import { connection } from '../shared/store/modules/listConnection';

const ListCard = ({ item }) => {
  const dispath = useDispatch();

  const handleClickCard = () => {
    dispath(
      connection({
        name: item.place_name,
        isClick: true,
        id: item.id
      })
    );
  };

  return (
    <S.MapListContent onClick={handleClickCard}>
      <div>
        <S.CafeName>{item.place_name}</S.CafeName>
        {/* <S.CafeHoursAndAddress>
          영업시간: <span>{hours}</span>
        </S.CafeHoursAndAddress> */}
        <S.CafeHoursAndAddress>
          주소: <span>{item.address_name}</span>
        </S.CafeHoursAndAddress>
      </div>
    </S.MapListContent>
  );
};

export default ListCard;
