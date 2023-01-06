import { TrinsicLogo } from "../Icons/TrinsicLogo";

export const Sidebar = () => {
    return (
        <div className="w-full h-full bg-gray-200 flex flex-col py-5 px-3">
            <TrinsicLogo width={28} height={35} className="fill-blue-600" />
        </div>
    );
};
