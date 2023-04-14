import { User } from "react-feather";

export const AccountButton = () => {
  return (
    <div className="flex flex-row items-center space-x-2 cursor-pointer">
      <User size={18} className="stroke-black" />
      <div className="text-md text-black font-semibold">Account</div>
    </div>
  );
};
