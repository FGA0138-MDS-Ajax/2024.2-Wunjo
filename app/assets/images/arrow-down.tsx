import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import Svg, { Path } from "react-native-svg"

function SvgComponent({size, style}: {size: number, style?: StyleProp<ViewStyle>}) {
  return (
    <Svg
      width={size - 1}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      style={style}
    >
      <Path
        d="M6 9.5l6 6 6-6"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
