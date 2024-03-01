import { Link } from 'react-router-dom';
import * as S from '../../styles/common';

const Header = () => {
  return (
    <Link to="/">
      <S.Logo>Coffee Holic</S.Logo>
    </Link>
  );
};

export default Header;
