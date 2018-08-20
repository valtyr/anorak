import React from 'react';
import {Path, Svg} from 'react-native-svg';

const getColor = ({dark, grey}) => {
  if (dark) return 'black';
  if (grey) return 'rgb(177, 177, 177)';
  return 'white';
};

const BackChevron = ({dark = false, grey = false}) => (
  <Svg width={18} height={30} viewBox="0 0 18 30">
    <Path
      d="M4.3119246,12.5 L13.765337,3.04840497 C14.4628359,2.35104016 14.4628359,1.22038841 13.765337,0.523023605 C13.0678381,-0.174341202 11.936969,-0.174341202 11.2394701,0.523023605 L0.523124174,11.2373093 C-0.174374725,11.9346741 -0.174374725,13.0653259 0.523124174,13.7626907 L11.2394701,24.4769764 C11.936969,25.1743412 13.0678381,25.1743412 13.765337,24.4769764 C14.4628359,23.7796116 14.4628359,22.6489598 13.765337,21.951595 L4.3119246,12.5 Z"
      fill={getColor({dark, grey})}
    />
  </Svg>
);

export default BackChevron;
