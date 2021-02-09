import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function PlayButtonSVG(props: SvgProps) {
    return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 58.752 58.752"
          {...props}
        >
          <Path d="M52.524 23.925L12.507.824c-1.907-1.1-4.376-1.097-6.276 0a6.294 6.294 0 00-3.143 5.44v46.205a6.29 6.29 0 003.131 5.435 6.263 6.263 0 006.29.005l40.017-23.103a6.3 6.3 0 003.138-5.439 6.315 6.315 0 00-3.14-5.442zm-3 5.687L9.504 52.716a.27.27 0 01-.279-.005.28.28 0 01-.137-.242V6.263a.28.28 0 01.421-.243l40.01 23.098a.29.29 0 01.145.249.283.283 0 01-.14.245z" />
        </Svg>
      )
    }

export default PlayButtonSVG
