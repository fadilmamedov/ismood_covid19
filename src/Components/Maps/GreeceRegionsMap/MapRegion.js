import React from 'react';
import types from 'prop-types';
import { Tooltip } from "react-svg-tooltip";

import { Regions as regions } from './GreeceRegionMap.Regions';

const getColorAndOpacity = (casesCount, maxCasesCount) => {
  if (casesCount === 0) {
    return { color: '#eee', opacity: 1 };
  }

  return {
    color: 'red',
    opacity: casesCount / maxCasesCount + 0.2,
  };
}

const getSelectedProps = (selected) => {
  if (selected) {
    return {
      stroke: 'black',
    };
  }

  return {};
}

const MapRegion = ({ title, casesCount, maxCasesCount, selected }) => {
  const regionRef = React.useRef(null);

  const { color, opacity } = getColorAndOpacity(casesCount, maxCasesCount);

  return (
    <>
      <g fill={color} fillOpacity={opacity} ref={regionRef} {...getSelectedProps(selected)}>
        {regions[title]}
      </g>

      <Tooltip triggerRef={regionRef}>
        <g>
          <rect
            x={10}
            y={10}
            width={100}
            height={30}
            rx={3}
            ry={3}
            fill="#5e6268"
          />

          <text x={20} y={30} fontSize={14} fill="white" fontFamily="Rubik" >
            Cases: {casesCount}
          </text>
        </g>
      </Tooltip>
    </>
  )
};

MapRegion.propTypes = {
  title: types.string.isRequired,
  casesCount: types.number.isRequired,
  maxCasesCount: types.number.isRequired,
  selected: types.bool,
};

MapRegion.defaultProps = {
  selected: false,
};

export { MapRegion };
