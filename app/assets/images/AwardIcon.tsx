import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const AwardIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#1A1A2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
    />
    <Path
      stroke="#1A1A2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"
    />
  </Svg>
);
export default AwardIcon;
