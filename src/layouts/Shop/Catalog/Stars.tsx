import "lodash";
import { range } from "lodash";
import { Star } from "react-feather";
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
            className={`flex cursor-pointer flex-row items-center space-x-3 ${
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
                                : "fill-gold-star stroke-gold-star"
                            : score < val
                            ? "stroke-gray-200"
                            : "fill-gold-star stroke-gold-star"
                    }
                />
            ))}
        </div>
    );
};
