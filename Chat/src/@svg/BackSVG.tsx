import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color: string;
}

function BackSVG({}: Props): React.JSX.Element {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none">
      <Path
        stroke="#E6E7EA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12.5H4m0 0 6 6m-6-6 6-6"
      />
    </Svg>
  );
}

export default BackSVG;
