import React from 'react';

import {Path, Svg, G} from 'react-native-svg';

const SearchIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20">
    <G x="-35.000000" y="-103.000000" fill="#A3A3A3" fillRule="evenodd">
      <G x="20.000000" y="87.000000">
        <Path d="M20.657,28.929 L22.071,30.343 L16.414,36 L15,34.586 L20.657,28.929 Z M28,28 C25.243,28 23,25.757 23,23 C23,20.243 25.243,18 28,18 C30.757,18 33,20.243 33,23 C33,25.757 30.757,28 28,28 L28,28 Z M28,16 C24.134,16 21,19.134 21,23 C21,26.866 24.134,30 28,30 C31.866,30 35,26.866 35,23 C35,19.134 31.866,16 28,16 L28,16 Z" />
      </G>
    </G>
  </Svg>
);

export default SearchIcon;
