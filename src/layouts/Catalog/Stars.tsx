import { Star } from "react-feather";
import { range } from "lodash";
import "lodash";
interface StarsProps {
    score: number;
    className?: string;
}

export const Stars = ({ score, className }: StarsProps) => {
    return (
        <div
            className={`flex flex-row items-center space-x-3 ${
                className ? className : ""
            }`}
        >
            {range(1, 6, 1).map((val, idx) => (
                <Star
                    size={18}
                    className={
                        score < val
                            ? "stroke-gray-200"
                            : "stroke-gold-star fill-gold-star"
                    }
                />
            ))}
        </div>
    );
};
