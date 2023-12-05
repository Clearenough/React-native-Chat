import React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function ProfileSVG(): React.JSX.Element {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none">
      <G clipPath="url(#a)">
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M16 2.667C8.636 2.667 2.667 8.636 2.667 16S8.636 29.333 16 29.333 29.333 23.364 29.333 16 23.364 2.667 16 2.667Zm-4.667 10a4.667 4.667 0 1 1 9.335 0 4.667 4.667 0 0 1-9.335 0Zm13.011 9.978A10.646 10.646 0 0 1 16 26.667a10.645 10.645 0 0 1-8.344-4.022C9.817 21.095 12.766 20 16 20c3.233 0 6.183 1.095 8.344 2.645Z"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h32v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ProfileSVG;
