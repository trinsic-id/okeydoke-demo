import { Star } from "react-feather";

export const SilverMember = () => {
    return (
        <div className="flex flex-row w-full items-center space-x-4 rounded-lg p-4 bg-gray-300">
            <Star
                className="stroke-gray-600 fill-gray-600 hidden md:block"
                size={16}
            />
            <Star
                className="stroke-gray-600 fill-gray-600 md:hidden"
                size={18}
            />
            <div className="text-gray-600 md:text-base font-medium">
                Silver member discount 10%
            </div>
        </div>
    );
};
