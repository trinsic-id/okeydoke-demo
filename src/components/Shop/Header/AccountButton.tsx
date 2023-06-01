import { User } from "react-feather";

export const AccountButton = () => {
    return (
        <div className="flex cursor-pointer flex-row items-center space-x-2">
            <User size={18} className="stroke-black" />
            <div className="text-md font-semibold text-black">Account</div>
        </div>
    );
};
