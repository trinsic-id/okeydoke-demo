import { Star } from "react-feather";

export const BronzeMember = () => {
    return (
        <div className="flex w-full flex-row items-center space-x-4 rounded-lg border-2 border-amber-600 p-4">
            <Star className="hidden stroke-amber-600 md:block" size={16} />
            <Star className="stroke-amber-600 md:hidden" size={18} />
            <div className="font-medium text-amber-600 md:text-base">
                Bronze member discount 5%
            </div>
        </div>
    );
};
