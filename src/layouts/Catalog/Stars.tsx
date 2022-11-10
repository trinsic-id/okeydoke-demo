import { Star } from "react-feather";
import { range } from "lodash";
import "lodash";
interface StarsProps {
    score: number;
}

export const Stars = ({ score }: StarsProps) => {
    return (
        <div className="flex flex-row items-center space-x-3">
            {range(1, 6, 1).map((val, idx) => (
                <Star
                    size={12}
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
