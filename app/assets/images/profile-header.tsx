import * as React from "react"
import Svg, { G, Path, Defs, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={385}
      height={212}
      viewBox="0 0 385 212"
      fill="none"
      {...props}
    >
      <G filter="url(#filter0_d_1764_3806)">
        <Path
          d="M380 187.06c-158.967 0-226.41 35.865-375 0V1h375v186.06z"
          fill="#173CAC"
        />
        <Path
          d="M380 187.06c-158.967 0-226.41 35.865-375 0V1h375v186.06z"
          stroke="#173CAC"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent
