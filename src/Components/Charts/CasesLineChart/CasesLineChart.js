import React from 'react';
import styled from 'styled-components/macro';
import { Line } from 'react-chartjs-2';

const Container = styled.div`
  position: relative;
  height: 500px;
  padding-top: 30px;

  @media screen and (max-width: 575px ) {
    height: 300px;
  }
`;

const CasesLineChart = ({ values }) => {
  const data = {
    datasets: [{
      data: values,
    }]
  };

  const options = {
    legend: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        offset: true,
        time: {
          unit: 'day'
        },
        gridLines: {
          color: '#f1f4f7'
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          suggestedMin: 0,
        },
        gridLines: {
          color: '#f1f4f7'
        }
      }],
    },
    elements: {
      point:{
        radius: 3,
        backgroundColor: '#5c7080',
      },
      line: {
        tension: 0,
        borderWidth: 1.5,
        borderColor: '#5c7080',
      },
    },
  };

  return (
    <Container>
      <Line
        data={data}
        options={options}
      />
    </Container>
  );
};

export { CasesLineChart };
