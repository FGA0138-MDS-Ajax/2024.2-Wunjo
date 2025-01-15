import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={8}
      height={14}
      viewBox="0 0 8 14"
      fill="none"
    >
      <Path
        d="M7 13L1 7l6-6"
        stroke="#1E293B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent