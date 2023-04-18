import { Calendar } from "react-feather";

export const NewSeason = () => {
    return (
        <div className="flex flex-row items-center space-x-2 rounded-lg border-2 py-1 px-2">
            <Calendar
                className="hidden fill-gray-300 stroke-gray-500 md:block"
                size={12}
            />
            <Calendar
                className="fill-gray-300 stroke-gray-500 md:hidden"
                size={18}
            />
            <div className="font-medium text-black md:text-sm">New season</div>
        </div>
    );
};
