import React from 'react';
import types from 'prop-types';
import styled from 'styled-components/macro';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const Title = styled.h6`
  margin: 0;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;
  font-family: Rubik;
  text-transform: uppercase;
`;

const Value = styled.h3`
  margin-bottom: 0;
  font-weight: normal;
  font-family: Rubik;
`;

const Description = styled.div`
  margin-left: 5px;
  margin-bottom: 2px;
  font-size: 12px;
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

const InfoCard = ({ title, value, timeseries, description }) => {
  const timeseriesChartData = (canvas) => {
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 30);
    gradient.addColorStop(0, '#bfccd6');
    gradient.addColorStop(0.3, '#e1e8ed');
    gradient.addColorStop(0.6, '#f5f8fa');
    gradient.addColorStop(0.8, '#fff');

    return {
      labels: timeseries.map(() => ''),
      datasets: [{
        data: timeseries,
        backgroundColor: gradient,
      }]
    };
  }

  const timeseriesChartOptions = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: -10,
      }
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      point:{
          radius: 0
      },
      line: {
        tension: 0,
        borderWidth: 1.5,
        borderColor: '#5c7080',
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          display:false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display:false
        },
        ticks: {
          display: false
        }
      }]
    },
  };

  return (
    <Card>
      <Card.Body>
        <Title>
          {title}
        </Title>

        <InnerContainer>
          <Value>
            {value}
          </Value>

          <Description>
            {description}
          </Description>
        </InnerContainer>

        {timeseries && (
          <ChartContainer>
            <Line
              data={timeseriesChartData}
              options={timeseriesChartOptions}
            />
          </ChartContainer>
        )}
      </Card.Body>
    </Card>
  );
};

InfoCard.propTypes = {
  title: types.string.isRequired,
  value: types.number.isRequired,
  timeseries: types.arrayOf(types.number),
  description: types.node,
};

export { InfoCard };
