import { Star } from "react-feather";

interface GoldMemberProps {
    mt?: boolean;
}

export const GoldMember = ({ mt = true }: GoldMemberProps) => {
    return (
        <div
            className={`flex w-full flex-row items-center space-x-4 rounded-lg ${
                mt ? "mt-2" : ""
            } bg-yellow-200 p-4`}
        >
            <Star
                className="hidden fill-yellow-600 stroke-yellow-600 md:block"
                size={16}
            />
            <Star
                className="fill-yellow-600 stroke-yellow-600 md:hidden"
                size={18}
            />
            <div className="font-medium text-yellow-600 md:text-base">
                Gold member discount 20%
            </div>
        </div>
    );
};
