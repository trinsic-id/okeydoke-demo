import {
    CredentialHandlerPolyfill,
    loadOnce,
} from "credential-handler-polyfill";
import { useEffect } from "react";

export const useChapiPolyfill = () => {
    const nav1: any = navigator;
    const nav: { credentialsPolyfill: CredentialHandlerPolyfill | undefined } =
        nav1;

    useEffect(() => {
        if (typeof nav.credentialsPolyfill !== "undefined") {
            return;
        }

        loadOnce(undefined);
    }, [loadOnce, nav.credentialsPolyfill]);

    return nav.credentialsPolyfill;
};
