import { useEffect } from "react";
import { ChevronRight } from "react-feather";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    selectedTrustRegistryNameState,
    selectedTrustRegistryState,
    trustRegistryState,
} from "../../atoms/registries";
import { RegistryTable } from "./RegistryTable";

export const Registries = () => {
    const selectedRegistry = useRecoilValue(selectedTrustRegistryState);
    const setSelectedRegistryName = useSetRecoilState(
        selectedTrustRegistryNameState
    );
    return (
        <div className="w-full h-full flex flex-col items-start p-2 gap-6">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex flex-col md:flex-row md:gap-4 items-start">
                    <div
                        className="text-base font-light cursor-pointer"
                        onClick={() => setSelectedRegistryName(undefined)}
                    >
                        Governance Frameworks
                    </div>
                    {selectedRegistry && (
                        <div className="flex flex-row gap-2 items-center">
                            <ChevronRight size={12} className="stroke-black" />
                            <div className="text-base font-light">
                                {selectedRegistry.name}
                            </div>
                        </div>
                    )}
                </div>
                <button className="rounded-lg px-3 py-1 bg-blue-500 text-white">
                    Add framework
                </button>
            </div>
            {selectedRegistry === undefined && <RegistryTable />}
        </div>
    );
};
