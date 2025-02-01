import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Balloon = (props: SvgProps) => (
  <Svg
    width={20}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      stroke="#1A1A2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 10.914a9.96 9.96 0 0 1-.9 4.176c-.706 1.551-1.79 2.856-3.133 3.769a7.94 7.94 0 0 1-4.467 1.396 7.77 7.77 0 0 1-3.8-.989L1 21.354l1.9-6.264a9.96 9.96 0 0 1-.9-4.176c0-1.734.44-3.434 1.27-4.91C4.1 4.53 5.289 3.337 6.7 2.562a7.771 7.771 0 0 1 3.8-.99h.5c2.084.127 4.053 1.094 5.53 2.716 1.475 1.622 2.355 3.786 2.47 6.076v.55Z"
    />
  </Svg>
)
export default Balloon
