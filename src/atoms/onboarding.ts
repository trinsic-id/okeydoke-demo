import { atom } from "recoil";
import { IllustrationOptions } from "../layouts/Home";

export const illustrationSelectorState = atom<IllustrationOptions>({
    key: "illustration-state",
    default: IllustrationOptions.CreateTemplate,
});
