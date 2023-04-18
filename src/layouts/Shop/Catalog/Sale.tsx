import { Tag } from "react-feather";

interface SalesProps {
    discount: number;
}

export const Sale = ({ discount }: SalesProps) => {
    return (
        <div className="flex flex-row items-center space-x-2 rounded-lg bg-red-200 py-1 px-2">
            <Tag className="hidden stroke-red-600 md:block" size={12} />
            <Tag className="stroke-red-600 md:hidden" size={18} />
            <div className="font-medium text-red-600 md:text-sm">{`Sale ${discount}%`}</div>
        </div>
    );
};
