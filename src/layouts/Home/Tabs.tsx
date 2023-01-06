import { range } from "lodash";
import { Dash } from "../../components/Icons/Dash";

interface TabsProps {
    activeIndex: number;
    numTabs: number;
}

export const Tabs = ({ activeIndex, numTabs }: TabsProps) => {
    return (
        <div className="flex flex-row gap-2">
            {range(0, numTabs + 1, 1).map((val, idx) => (
                <Dash
                    height={4}
                    width={25.17}
                    className={
                        val === activeIndex
                            ? "fill-blue-400 stroke-blue-400"
                            : "fill-gray-300 stroke-gray-300"
                    }
                />
            ))}
        </div>
    );
};
