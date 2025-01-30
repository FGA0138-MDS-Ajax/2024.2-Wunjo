import * as React from "react"
import Svg, { G, Path, Defs, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={545}
      height={212}
      viewBox="0 0 545 212"
      fill="none"
      {...props}
    >
      <G filter="url(#filter0_d_1772_3869)">
        <Path
          d="M540 187.06c-226.793 0-323.012 35.865-535 0V1h535v186.06z"
          fill="#173CAC"
        />
        <Path
          d="M540 187.06c-226.793 0-323.012 35.865-535 0V1h535v186.06z"
          stroke="#173CAC"
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default SvgComponent
