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

const PracticeIcon = ({ color, size }: SVGProps) => {
  return (
    <Svg width={size * 1.2} height={size * 1.2} viewBox="0 0 32 33" in>
      <AnimatedPath
        fill={color}
        d="M14.458 32c7.945 0 14.385-6.44 14.385-14.385 0-2.444-.608-4.745-1.682-6.759a2.505 2.505 0 01-.564.017l-1.83-.141-1.316 1.316a10.527 10.527 0 011.585 5.567c0 5.839-4.735 10.574-10.574 10.574S3.885 23.454 3.885 17.615c0-5.839 4.735-10.574 10.574-10.574 2.045 0 3.952.581 5.567 1.585l1.192-1.192-.161-2.099a2.779 2.779 0 01.007-.5 14.33 14.33 0 00-6.608-1.605C6.515 3.23.074 9.67.074 17.615S6.514 32 14.459 32z"
      />
      <AnimatedPath
        fill={color}
        d="M14.458 13.898c.094 0 .188.003.282.01l2.713-2.713a7.081 7.081 0 00-10.077 6.417 7.081 7.081 0 1013.499-2.992l-2.713 2.713a3.716 3.716 0 11-3.704-3.435z"
      />
      <AnimatedPath
        fill={color}
        d="M29.283 4.788l.853-.853a.992.992 0 000-1.407l-.591-.594a.992.992 0 00-1.404 0l-.977.977-.201-2.602A.33.33 0 0026.627 0a.327.327 0 00-.235.097l-3.845 3.845a1.68 1.68 0 00-.487 1.316l.01.151.185 2.408-7.444 7.444a.831.831 0 00-.242.527l-.067.843a.84.84 0 00.836.907h.044l.89-.044a.827.827 0 00.551-.245l7.555-7.555 2.293.175c.044.003.087.003.128.003.443 0 .87-.175 1.189-.49l3.841-3.841a.335.335 0 00-.212-.571l-2.334-.181z"
      />
    </Svg>
  );
};

export default PracticeIcon;
