import { atom, selector } from "recoil";
import { Registries } from "../data/registries";
import { TrustRegistry } from "../models/registries";

export const trustRegistryState = atom<TrustRegistry[]>({
    key: "trust-registry-state",
    default: Registries,
});

export const selectedTrustRegistryNameState = atom<string | undefined>({
    key: "selected-trust-registry-name-state",
    default: undefined,
});

export const selectedTrustRegistryState = selector<TrustRegistry | undefined>({
    key: "selected-trust-registry-state",
    get: ({ get }) => {
        const registries = get(trustRegistryState);
        const selectedName = get(selectedTrustRegistryNameState);

        if (selectedName) {
            return registries.filter(
                (registry) => registry.name === selectedName
            )[0];
        }
        return undefined;
    },
});
