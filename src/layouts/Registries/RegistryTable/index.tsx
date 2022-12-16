import { sortBy } from "lodash";
import { useMemo } from "react";
import { ChevronUp } from "react-feather";
import { useToggle } from "react-use";
import { useRecoilValue } from "recoil";
import { trustRegistryState } from "../../../atoms/registries";
import { RegistryTableRow } from "./RegistryTableRow";

export const RegistryTable = () => {
    const registries = useRecoilValue(trustRegistryState);
    const [isSortNameUp, toggleSortNameUp] = useToggle(true);

    return (
        <div className="w-full flex flex-col divide-y divide-black rounded-lg border-black border p-2">
            <div className="w-full flex flex-row p-2">
                <div
                    className="flex flex-row gap-2 items-center cursor-pointer w-1/3"
                    onClick={toggleSortNameUp}
                >
                    <div className="text-lg font-light text-black ">Name</div>
                    <ChevronUp
                        size={12}
                        className={`stroke-black ${
                            !isSortNameUp ? "-scale-y-100" : ""
                        }`}
                    />
                </div>
                <div className="text-lg font-light text-black w-1/3 text-center">
                    Issuers
                </div>
                <div className="text-lg font-light text-black w-1/3 text-center">
                    Templates
                </div>
            </div>
            {registries.map((registry, idx) => (
                <RegistryTableRow key={idx} registry={registry} />
            ))}
            <div></div>
        </div>
    );
};
