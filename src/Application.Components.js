import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { InfoCard as InfoCardBase } from 'Components/Common';

const ContentContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
`;

const CriticalValue = styled.span`
  color: #da1e1e;
`;

const InfoCard = styled(InfoCardBase)`
  border: 0;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, .15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 1px rgba(16, 22, 26, .1), 0 2px 4px rgba(16, 22, 26, .2), 0 8px 24px rgba(16, 22, 26, .2)
  }
`;

const ChartLink = styled(Link)`
  color: black;

  &:hover {
    color: black;
    text-decoration: none;
  }
`;

export {
  InfoCard,
  ChartLink,
  CriticalValue,
  ContentContainer,
}