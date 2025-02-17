import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface StarProps extends SvgProps {
  size?: number;
}

const StarWhite: React.FC<StarProps> = ({ size = 32, ...props }) => {
  return (
    <Svg
      width={size}
      height={size} 
      viewBox="0 0 32 30"
      fill="none"
      {...props}
    >
      <Path
        d="M16.476.845a.5.5 0 00-.951 0l-3.256 10.02H1.734a.5.5 0 00-.294.904l8.523 6.193L6.708 27.98a.5.5 0 00.77.559L16 22.348l8.523 6.192a.5.5 0 00.77-.56l-3.256-10.018 8.523-6.193a.5.5 0 00-.294-.904H19.73L16.475.845z"
        fill="#D9D9D9"
        stroke="#474747"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StarWhite;
