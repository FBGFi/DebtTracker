export interface ReactComponentProps {
    children?: JSX.Element | JSX.Element[] | any;
}

export interface ScreenProps extends ReactComponentProps {
    
}

export interface SVGProps {
    fill?: string;
    height?: number | string;
    width?: number | string;
}