import styled from 'styled-components/macro';

const Title = styled.h6`
  margin: 0;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

const Value = styled.h3`
  margin-bottom: 0;
  font-weight: normal;
  color: ${props => props.color};
`;

const Description = styled.div`
  margin-left: 5px;
  margin-bottom: 2px;
  font-size: 12px;
  white-space: nowrap;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 36px;
  margin-top: 20px;
`;

export {
  Title,
  Value,
  Description,
  InnerContainer,
  ChartContainer,
};
