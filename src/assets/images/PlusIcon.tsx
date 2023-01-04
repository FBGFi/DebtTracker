import React from "react";
import Svg, { Polygon } from "react-native-svg";
import { SVGProps } from "../../constants/types";

export const PlusIcon = (props: SVGProps) => {
  return (
    <Svg
      width={props.width || "100%"}
      height={props.height || "100%"}
      viewBox="0 0 44 44">
      <Polygon
        points="30.25 44 13.75 44 13.75 30.25 0 30.25 0 13.75 13.75 13.75 13.75 0 30.25 0 30.25 13.75 44 13.75 44 30.25 30.25 30.25 30.25 44"
        transform="translate(-2.2 -2.2)"
        fill={props.fill || "#FFFFFF"}
      />
    </Svg>
  );
};
