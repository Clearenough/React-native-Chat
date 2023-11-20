import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function DropoutSVG(): React.JSX.Element {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}>
      <G fill="#000">
        <Path d="M14.5 4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM14.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12 22.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      </G>
    </Svg>
  );
}

export default DropoutSVG;
