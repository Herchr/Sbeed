// @ts-nocheck

import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { Path, PathProps } from "react-native-svg";
export interface SVGProps {
  color: Animated.Node<string>;
  size: number;
}
const AnimatedPath = (Animated.createAnimatedComponent(
  Path
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & { style?: any }>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const Icon = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size * 1.2} height={size * 1.2} viewBox="0 0 32 32">
      <AnimatedPath
        stroke={color}
        strokeWidth={1.5}
        fill={color}
        d="M9.76 6.56C5.792 8.24 3.696 9.2 3.552 9.424c-.208.288-.192.384.032.736.144.224.384.4.544.4.144 0 2.928-1.104 6.176-2.464l5.888-2.464 5.936 2.464c6.08 2.544 6.528 2.688 6.752 1.984.24-.752.08-.848-6.256-3.504-3.392-1.408-6.32-2.576-6.512-2.56S13.056 5.168 9.76 6.56zM9.184 12.4c-.976.208-2.304.8-3.136 1.392l-.448.304v6.688c0 4.976.048 6.72.192 6.864.304.304.736.224 1.792-.288 2.128-1.04 5.328-1.024 7.536.064l1.12.56.64-.384c2.16-1.248 5.552-1.328 8-.192 1.248.592 1.632.592 1.856.016.08-.24.144-3.136.144-6.688 0-7.264.112-6.768-1.664-7.6-1.28-.624-2.768-.976-4.112-.976-1.248 0-3.28.48-4.224 1.008l-.672.384-.928-.464c-1.712-.88-4.048-1.136-6.096-.688zm3.984 1.6c.512.128 1.2.384 1.552.56l.64.32v10.848l-.992-.336c-1.44-.464-4.736-.464-6.16 0l-1.008.336V14.88l.64-.32c1.536-.784 3.632-1.008 5.328-.56zm10.48.208c.464.176 1.024.448 1.248.592l.384.24v5.264c0 2.88-.032 5.28-.08 5.328s-.4-.016-.768-.144c-1.28-.448-3.184-.608-4.736-.4-.784.112-1.712.304-2.08.432l-.656.224V14.912l.752-.368a9.215 9.215 0 011.568-.576c1.12-.288 3.312-.16 4.368.24z"
      />
    </Svg>
  );
};

export default Icon;
