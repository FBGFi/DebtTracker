import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import { SVGProps } from "../../constants/types";

export const TrashIcon = (props: SVGProps) => {
  return (
    <Svg
      width={props.width || "100%"}
      height={props.height || "100%"}
      viewBox="0 0 43.61 43.6">
      <Path
        d="M38,7H29A5,5,0,0,0,19,7H10a5,5,0,0,0,0,10V40a5,5,0,0,0,5,5H33a5,5,0,0,0,5-5V17A5,5,0,0,0,38,7ZM24,5a2,2,0,0,1,2,2H22A2,2,0,0,1,24,5ZM35,40a2,2,0,0,1-2,2H15a2,2,0,0,1-2-2V17H35Zm3-26H10a2,2,0,0,1,0-4H38a2,2,0,0,1,0,4Z"
        fill={props.fill || "#FFFFFF"}
        transform="translate(-5 -2)"
      />
      <Rect
        x="11"
        y="19.5"
        width="3"
        height="16"
        rx="1.5"
        ry="1.5"
        fill={props.fill || "#FFFFFF"}
      />
      <Rect
        x="17.5"
        y="19.5"
        width="3"
        height="16"
        rx="1.5"
        ry="1.5"
        fill={props.fill || "#FFFFFF"}
      />
      <Rect
        x="24"
        y="19.5"
        width="3"
        height="16"
        rx="1.5"
        ry="1.5"
        fill={props.fill || "#FFFFFF"}
      />
    </Svg>
  );
};
