import styled from 'styled-components';

/*------------ kakao Map ----------*/
export const MapWrapper = styled.section`
  & * {
    border: none !important;
    border-radius: 10px;
  }
`;

export const MapMarkerStyle = styled.div`
  padding: 40px 40px 20px;
  background-color: #fff;
  color: #333;
  white-space: nowrap;
  border: 1px solid #ccc !important;
  & > h2 {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 20px;
  }
  & > p {
    font-size: 14px;
    color: #999;
  }
  & > div {
    margin-top: 20px;
    width: 100%;
  }

  & > div::after {
    content: '';
    display: block;
    clear: both;
  }

  & > div > button {
    padding: 5px 10px;
    float: right;
  }
  & > div > button:hover {
    color: #fff;
    background-color: #333;
  }
`;

/*------------ Header ----------*/
export const Logo = styled.h1`
  margin: 20px;
  width: 100%;
  text-align: center;
`;
