import { toString } from "lodash";

export interface IconProps {
    height: number;
    width: number;
    color: string;
    opacity?: number;
    className?: string;
}

export const TrinsicLogo = ({
    width,
    height,
    opacity,
    className,
    color,
}: IconProps) => {
    return (
        <svg
            width={toString(width)}
            height={toString(height)}
            opacity={opacity ? opacity : 1}
            className={`${className ? className : ""}`}
            viewBox="0 0 61 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.4999 0.0996094C28.734 0.0996094 27.3025 1.5625 27.3025 3.36707V62.1813C27.3025 63.9859 28.734 65.4488 30.4999 65.4488C32.2658 65.4488 33.6973 63.9859 33.6973 62.1813V3.36707C33.6973 1.5625 32.2658 0.0996094 30.4999 0.0996094ZM40.5717 62.3739V16.7333V13.4732C40.5717 11.6727 42.0748 10.2132 43.9289 10.2132C45.7831 10.2132 47.2861 11.6727 47.2861 13.4732V16.7333V62.3739C47.2861 71.3763 39.7707 78.6742 30.5 78.6742C21.2292 78.6742 13.7138 71.3763 13.7138 62.3739V16.7332V13.4732C13.7138 11.6727 15.2169 10.2132 17.071 10.2132C18.9252 10.2132 20.4283 11.6727 20.4283 13.4732V16.7332V62.3739C20.4283 67.7754 24.9375 72.1541 30.5 72.1541C36.0624 72.1541 40.5717 67.7754 40.5717 62.3739ZM6.875 62.5592C6.875 75.1625 17.4523 85.3795 30.5 85.3795C43.5477 85.3795 54.125 75.1625 54.125 62.5592V26.6986C54.125 24.8982 55.636 23.4386 57.5 23.4386C59.364 23.4386 60.875 24.8982 60.875 26.6986V62.5592C60.875 78.7635 47.2756 91.8996 30.5 91.8996C13.7244 91.8996 0.125 78.7635 0.125 62.5592V42.9989C0.125 41.1984 1.63604 39.7388 3.5 39.7388C5.36396 39.7388 6.875 41.1984 6.875 42.9989V62.5592Z"
                fill={color}
            />
            {/* <defs>
                <linearGradient
                    id="paint0_linear_951_10059"
                    x1="9.02163"
                    y1="13.5434"
                    x2="68.7696"
                    y2="53.0825"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#DBE0E6" />
                    <stop offset="1" stopColor="#F9FAFB" />
                </linearGradient>
            </defs> */}
        </svg>
    );
};
