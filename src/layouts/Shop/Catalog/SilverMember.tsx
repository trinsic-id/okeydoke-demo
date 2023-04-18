import { Star } from "react-feather";

export const SilverMember = () => {
    return (
        <div className="flex flex-row items-center space-x-2 rounded-lg bg-gray-300 py-1 px-2">
            <Star
                className="hidden fill-gray-600 stroke-gray-600 md:block"
                size={12}
            />
            <Star
                className="fill-gray-600 stroke-gray-600 md:hidden"
                size={18}
            />
            <div className="font-medium text-gray-600 md:text-sm">
                Silver member discount 10%
            </div>
        </div>
    );
};
