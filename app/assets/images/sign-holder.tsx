import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={171}
      height={62}
      viewBox="0 0 171 62"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.924.087a.209.209 0 00-.291-.048L.209 60.626a.5.5 0 10.583.812L80.43 4.286a8 8 0 019.328 0l79.638 57.152a.5.5 0 00.583-.812L85.555.039a.209.209 0 00-.292.048.209.209 0 01-.339 0z"
        fill="#000"
      />
    </Svg>
  )
}

export default SvgComponent
