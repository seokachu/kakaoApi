import * as S from '../styles/maplist';
import { useSelector } from 'react-redux';
import ListCard from './ListCard';

const MapList = () => {
  const list = useSelector((state) => state.list);
  console.log(list);

  return (
    <S.MapListWrapper>
      <S.MapList>
        {list.map((item, index) => (
          <ListCard key={index} item={item} />
        ))}
      </S.MapList>
    </S.MapListWrapper>
  );
};

export default MapList;
