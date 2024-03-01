import { Outlet } from 'react-router-dom';
import * as S from '../../styles/aside';
import Search from '../Search';
import Header from '../../components/common/Header';
import MapList from '../../components/MapList';

const Aside = () => {
  return (
    <>
      <S.Aside>
        <Header />
        <Search />
        <MapList />
      </S.Aside>
      <Outlet />
    </>
  );
};

export default Aside;
