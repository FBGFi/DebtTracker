import React from "react";
import Svg, { Path } from "react-native-svg";
import { SVGProps } from "../../constants/types";

export const ClipBoardIcon = (props: SVGProps) => {
    return (
        <Svg width={props.width || "100%"} height={props.height || "100%"} viewBox="0 0 40 40">
            <Path
                d="M35.59,9.41H7a3,3,0,0,0-3,3V41a3,3,0,0,0,3,3H35.59a3,3,0,0,0,3-3V12.41A3,3,0,0,0,35.59,9.41Zm1,31.59a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12.41a1,1,0,0,1,1-1H35.59a1,1,0,0,1,1,1Z"
                transform="translate(-4 -4)"
                fill={props.fill || "#FFFFFF"} />
            <Path
                d="M40.76,41.84h0a1.08,1.08,0,0,1,0-1.53l.26-.26a2.81,2.81,0,0,0,.82-2V9A2.81,2.81,0,0,0,39,6.16H9.94a2.81,2.81,0,0,0-2,.82l-.26.26a1.08,1.08,0,0,1-1.53,0h0a1.08,1.08,0,0,1,0-1.53l.89-.89A2.81,2.81,0,0,1,9,4H41.19A2.81,2.81,0,0,1,44,6.81V39a2.81,2.81,0,0,1-.82,2l-.89.89A1.08,1.08,0,0,1,40.76,41.84Z"
                transform="translate(-4 -4)"
                fill={props.fill || "#FFFFFF"} />
        </Svg >
    );
}