import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const ChatIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      stroke="#1A1A2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.333 11.5a8.379 8.379 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.379 8.379 0 0 1-3.8-.9l-5.7 1.9 1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
    />
  </Svg>
);
export default ChatIcon;
