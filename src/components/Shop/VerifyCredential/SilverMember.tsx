import { Star } from "react-feather";

export const SilverMember = () => {
    return (
        <div className="flex w-full flex-row items-center space-x-4 rounded-lg bg-gray-300 p-4">
            <Star
                className="hidden fill-gray-600 stroke-gray-600 md:block"
                size={16}
            />
            <Star
                className="fill-gray-600 stroke-gray-600 md:hidden"
                size={18}
            />
            <div className="font-medium text-gray-600 md:text-base">
                Silver member discount 10%
            </div>
        </div>
    );
};
