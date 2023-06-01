import { Star } from "react-feather";

export const BronzeMember = () => {
    return (
        <div className="flex flex-row items-center space-x-2 rounded-lg border border-amber-600 py-1 px-2">
            <Star
                className="hidden fill-amber-600 stroke-amber-600 md:block"
                size={12}
            />
            <Star
                className="fill-amber-600 stroke-amber-600 md:hidden"
                size={18}
            />
            <div className="font-medium text-amber-600 md:text-sm">
                Bronze member discount 5%
            </div>
        </div>
    );
};
