import { Star } from "react-feather";

export const GoldMember = () => {
    return (
        <div className="flex flex-row items-center space-x-2 rounded-lg bg-yellow-200 py-1 px-2">
            <Star
                className="hidden fill-yellow-600 stroke-yellow-600 md:block"
                size={12}
            />
            <Star
                className="fill-yellow-600 stroke-yellow-600 md:hidden"
                size={18}
            />
            <div className="font-medium text-yellow-600 md:text-sm">
                Gold member discount 20%
            </div>
        </div>
    );
};
