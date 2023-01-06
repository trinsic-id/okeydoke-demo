import { toString } from "lodash";
import { IconProps } from ".";

export const ArrowLeft = ({
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
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.37992 3.95312L2.33325 7.99979L6.37992 12.0465M13.6665 7.99967H2.44653"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
