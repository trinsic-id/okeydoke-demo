import { Star } from "react-feather";

export const GoldMember = () => {
    return (
        <div className="flex flex-row w-full items-center space-x-4 rounded-lg mt-2 p-4 bg-yellow-200">
            <Star
                className="stroke-yellow-600 fill-yellow-600 hidden md:block"
                size={16}
            />
            <Star
                className="stroke-yellow-600 fill-yellow-600 md:hidden"
                size={18}
            />
            <div className="text-yellow-600 md:text-base font-medium">
                Gold member discount 20%
            </div>
        </div>
    );
};
