import { Star } from "react-feather";

export const BronzeMember = () => {
    return (
        <div className="flex flex-row w-full items-center space-x-4 rounded-lg p-4 border-2 border-amber-600">
            <Star className="stroke-amber-600 hidden md:block" size={16} />
            <Star className="stroke-amber-600 md:hidden" size={18} />
            <div className="text-amber-600 md:text-base font-medium">
                Bronze member discount 5%
            </div>
        </div>
    );
};
