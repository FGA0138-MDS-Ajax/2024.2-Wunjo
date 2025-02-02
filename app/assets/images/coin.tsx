import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <Path
        fill="url(#pattern0_1702_2157)"
        d="M0.473633 0H20.999933V20H0.473633z"
      />
      <Defs>
        <Pattern
          id="pattern0_1702_2157"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_1702_2157"
            transform="matrix(.0203 0 0 .02083 .013 0)"
          />
        </Pattern>
        <Image
          id="image0_1702_2157"
          width={48}
          height={48}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  )
}

export default SvgComponent
