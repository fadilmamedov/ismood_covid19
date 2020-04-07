import React from 'react';
import types from 'prop-types';
import { Tooltip } from "react-svg-tooltip";

import * as translations from 'Assets/Translations';

import { Regions as regions } from './GreeceRegionMap.Regions';

const getColorAndOpacity = (casesCount, maxCasesCount) => {
  if (casesCount === 0) {
    return { color: '#eee', opacity: 1 };
  }

  return {
    color: 'red',
    opacity: (casesCount / maxCasesCount) * 0.8 + 0.2,
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

const MapRegion = ({
  name,
  title,
  casesCount,
  maxCasesCount,
  language,
  selected,
}) => {
  const { Tooltip: { Title: TooltipTitle } } = translations[language].Maps.Greece;

  const regionRef = React.useRef(null);

  const { color, opacity } = getColorAndOpacity(casesCount, maxCasesCount);

  return (
    <>
      <g fill={color} fillOpacity={opacity} ref={regionRef} {...getSelectedProps(selected)}>
        {regions[name]}
      </g>

      <Tooltip triggerRef={regionRef}>
        <g>
          <rect
            x={10}
            y={10}
            width={250}
            height={60}
            rx={3}
            ry={3}
            fill="#5e6268"
          />

          <text x={20} y={30} fontSize={16} fill="white" fontFamily="Rubik">
            {title}
          </text>

          <text x={20} y={55} fontSize={16} fontWeight="500" fill="white" fontFamily="Rubik">
            {TooltipTitle}: {casesCount}
          </text>
        </g>
      </Tooltip>
    </>
  )
};

MapRegion.propTypes = {
  name: types.string.isRequired,
  title: types.string,
  casesCount: types.number.isRequired,
  maxCasesCount: types.number.isRequired,
  language: types.string.isRequired,
  selected: types.bool,
};

MapRegion.defaultProps = {
  selected: false,
};

export { MapRegion };
