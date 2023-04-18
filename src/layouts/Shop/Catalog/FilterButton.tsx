import { Switch } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { filterProductsState } from "../../../atoms/products";

export const FilterButton = () => {
    const [isFiltered, toggleFilter] = useRecoilState(filterProductsState);
    return (
        <Switch.Group>
            <div className="flex flex-row items-center gap-2">
                <Switch.Label className={`text-lg text-black`}>
                    Filter
                </Switch.Label>

                <Switch
                    checked={isFiltered}
                    onChange={() => {
                        toggleFilter((val) => !val);
                    }}
                    className={`border-2 border-black bg-transparent focus:outline-none ${
                        !isFiltered && "border-opacity-30"
                    } relative inline-flex h-4 w-8 items-center rounded-full transition duration-500 ease-in-out`}
                >
                    <span
                        className={`h-2 w-2 transform rounded-full bg-black transition duration-300 ease-in-out ${
                            isFiltered ? "translate-x-1" : "translate-x-4"
                        }`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
};
