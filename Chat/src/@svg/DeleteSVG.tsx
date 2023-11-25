import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
}

function DeleteSVG({color}: Props): React.JSX.Element {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 21 21"
      width={24}
      height={24}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M7.35 16h2.1V8h-2.1v8Zm4.2 0h2.1V8h-2.1v8Zm-6.3 2h10.5V6H5.25v12Zm2.1-14h6.3V2h-6.3v2Zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4h-5.25Z"
        stroke={color}
      />
    </Svg>
  );
}

export default DeleteSVG;
