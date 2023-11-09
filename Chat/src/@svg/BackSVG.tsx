import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
}

function BackSVG({color}: Props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width={24}
      height={24}>
      <Path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        stroke={color}
      />
      <Path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        stroke={color}
      />
    </Svg>
  );
}

export default BackSVG;
