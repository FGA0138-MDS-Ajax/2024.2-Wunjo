import * as React from "react";
import { Svg, Path } from "react-native-svg";

import { SvgProps } from "react-native-svg";

interface ProfileHeaderProps extends SvgProps {}

const ProfileHeader = (props: ProfileHeaderProps) => (
  <Svg
    viewBox="0 0 1440 320"
    width="100%"
    height="100%"
    {...props}
  >
    <Path
      fill="#173CAC"
      d="M0,64L48,85.3C96,107,192,149,288,176C384,203,480,213,576,197.3C672,181,768,139,864,138.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </Svg>
);

export default ProfileHeader;