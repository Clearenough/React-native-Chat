import React from 'react';
import Svg, {Path} from 'react-native-svg';

function SendSVG(): React.JSX.Element {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12 4 4l2 8m14 0L4 20l2-8m14 0H6"
      />
    </Svg>
  );
}

export default SendSVG;
