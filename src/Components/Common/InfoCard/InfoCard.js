import React from 'react';
import types from 'prop-types';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

import {
  Title,
  Value,
  Description,
  InnerContainer,
  ChartContainer,
} from './InfoCard.Components';

const InfoCard = ({
  title,
  value,
  valueColor,
  timeseries,
  description,
  className,
}) => {
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
    <Card className={className}>
      <Card.Body>
        <Title>
          {title}
        </Title>

        <InnerContainer>
          <Value color={valueColor}>
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
  valueColor: types.string,
  timeseries: types.arrayOf(types.number),
  description: types.node,
  className: types.string,
};

InfoCard.defaultProps = {
  valueColor: 'black',
};

export { InfoCard };
