import styled from 'styled-components';

export const MapListWrapper = styled.section`
  width: 100%;
  overflow: scroll;
  height: 100%;
  padding-bottom: 100px;
`;

export const MapList = styled.ul`
  width: 100%;
  padding: 20px;
`;

export const MapListContent = styled.li`
  width: 100%;
  line-height: 24px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px;
  cursor: pointer;
`;

export const CafeName = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const CafeHoursAndAddress = styled.p`
  & > span {
    color: #999;
  }
`;
