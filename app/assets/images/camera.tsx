import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const CameraIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#969696"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z"
    />
    <Path
      stroke="#969696"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </Svg>
);

export default CameraIcon;