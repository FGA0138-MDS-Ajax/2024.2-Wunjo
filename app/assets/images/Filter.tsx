import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Filter = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke="#173CAC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M27.942 5.646A1 1 0 0 0 27.178 4H4.822a1 1 0 0 0-.764 1.646l9.039 10.688a1 1 0 0 1 .236.646v7.735a1 1 0 0 0 .553.895l3.334 1.666a1 1 0 0 0 1.447-.894V16.98a1 1 0 0 1 .236-.646l9.039-10.688Z"
    />
  </Svg>
)
export default Filter
