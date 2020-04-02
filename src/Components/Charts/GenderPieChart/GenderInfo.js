import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div``;

const Title = styled.p`
  margin-bottom: 5px;
  color: #8392a5;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ColorIndicator = styled.div`
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-right: 7px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ValueNumber = styled.h5`
  margin: 0;
  font-weight: normal;
`;

const GenderInfo = ({ title, count, totalCount, color, className }) => {
  const valuePercent = count / totalCount * 100;

  return (
    <Container className={className}>
      <Title>
        {title}
      </Title>

      <ValueContainer>
        <ColorIndicator color={color} />

        <ValueNumber>
          {valuePercent.toFixed(2)}%
        </ValueNumber>
      </ValueContainer>
    </Container>
  )
}

GenderInfo.propTypes = {
  title: types.string.isRequired,
  count: types.number.isRequired,
  totalCount: types.number.isRequired,
  color: types.string,
  className: types.string,
};

export { GenderInfo };
