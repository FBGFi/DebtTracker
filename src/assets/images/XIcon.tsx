import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { SVGProps } from "../../constants/types";

export const XIcon = (props: SVGProps) => {
  return (
    <Svg
      width={props.width || "100%"}
      height={props.height || "100%"}
      viewBox="0 0 46.67 46.67">
      <Polygon
        fill={props.fill || "#FFFFFF"}
        points="46.67 33.94 33.94 46.67 23.34 36.06 12.73 46.67 0 33.94 10.61 23.34 0 12.73 12.73 0 23.34 10.61 33.94 0 46.67 12.73 36.06 23.34 46.67 33.94"
      />
    </Svg>
  );
};
