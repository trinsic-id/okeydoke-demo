import { Star } from "react-feather";
import { range } from "lodash";
import "lodash";
import { useState } from "react";
interface StarsProps {
    score: number;
    className?: string;
    hoverPos?: number;
    setHoverPos: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Stars = ({
    score,
    className,
    hoverPos,
    setHoverPos,
}: StarsProps) => {
    return (
        <div
            className={`flex flex-row items-center space-x-3 cursor-pointer ${
                className ? className : ""
            }`}
        >
            {range(1, 6, 1).map((val) => (
                <Star
                    onMouseOver={() => setHoverPos(val)}
                    key={val}
                    size={18}
                    className={
                        hoverPos !== undefined
                            ? hoverPos < val
                                ? "stroke-gray-200"
                                : "stroke-gold-star fill-gold-star"
                            : score < val
                            ? "stroke-gray-200"
                            : "stroke-gold-star fill-gold-star"
                    }
                />
            ))}
        </div>
    );
};
