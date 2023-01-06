import { toString } from "lodash";
import { IconProps } from ".";

export const Dash = ({
    width,
    height,
    opacity,
    color,
    className,
}: IconProps) => {
    return (
        <svg
            width={toString(width)}
            height={toString(height)}
            opacity={opacity ? opacity : 1}
            className={`${className ? className : ""}`}
            viewBox="0 0 50 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="49.3333" height="4" rx="2" />
        </svg>
    );
};
