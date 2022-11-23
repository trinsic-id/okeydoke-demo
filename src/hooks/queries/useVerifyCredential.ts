import { useMutation, useQueryClient } from "react-query";
import { CredentialDerivedProof } from "../../models/credential";

type VerifyCredentialProps = {
    derivedProof: CredentialDerivedProof;
};

const handleVerifyCredential = async (
    derivedProof: VerifyCredentialProps["derivedProof"]
): Promise<any> => {
    console.log(JSON.stringify(derivedProof));
    const response = await fetch(
        `${process.env.REACT_APP_VERIFY_ENDPOINT}/api/trinsic/verify`,
        {
            method: "POST",
            body: JSON.stringify(derivedProof),
        }
    );

    if (!response.ok) {
        throw Error("Unable to verify credential.");
    }

    return await response.json();
};

export const useVerifyCredential = (onError?: () => void) => {
    return useMutation(
        ({ derivedProof }: VerifyCredentialProps) =>
            handleVerifyCredential(derivedProof),
        {
            onSuccess: () => {},
            // TODO: Better error messaging
            onError: (err) => {
                window.alert(err);
                onError?.();
            },
        }
    );
};
