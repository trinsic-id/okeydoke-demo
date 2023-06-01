import { useRecoilValue } from "recoil";
import { memberProduceState } from "../../../atoms/member";
import { ProduceType } from "../../../data/products";

export const CredentialIssued = () => {
    const memberProduceType = useRecoilValue(memberProduceState);

    return (
        <div className="flex flex-col items-start space-y-4">
            <div className="flex w-full flex-row items-center">
                <div className="w-full text-base font-light leading-tight sm:text-lg">
                    {`Credential issued by the`}
                    <br />
                    {memberProduceType === ProduceType.CORN
                        ? `Corndog Millionaires`
                        : `Agrio Farming Community`}
                </div>
                {memberProduceType === ProduceType.CORN ? (
                    <img
                        src="/images/corndog-millionaires.jpg"
                        className="h-12 w-28 rounded-lg"
                    />
                ) : (
                    <img
                        src="/images/agrio.jpeg"
                        className="h-12  w-28 rounded-lg"
                    />
                )}
            </div>
            <div className="flex w-full flex-row items-center justify-between">
                <div className="w-full text-base font-light leading-tight sm:text-lg">
                    Revocation Status:
                </div>
                <div className="flex h-8 w-28 place-content-center items-center rounded-lg border-2 border-green-600 bg-green-200 py-4 px-12 text-base font-medium leading-tight text-green-600 sm:text-lg">
                    Valid
                </div>
            </div>
            <div className="flex w-full flex-row items-center justify-between">
                <div className="w-full text-base font-light leading-tight sm:text-lg">
                    Trust registry:
                </div>
                <div className="flex h-8 w-28 place-content-center items-center rounded-lg border-2 border-green-600 bg-green-200 py-4 px-12 text-base font-medium leading-tight text-green-600 sm:text-lg">
                    Valid
                </div>
            </div>
            <div className="flex w-full flex-row items-center justify-between">
                <div className="w-full text-base font-light leading-tight sm:text-lg">
                    Schema validation:
                </div>
                <div className="flex h-8 w-28 place-content-center items-center rounded-lg border-2 border-green-600 bg-green-200 py-4 px-12 text-base font-medium leading-tight text-green-600 sm:text-lg">
                    Valid
                </div>
            </div>
        </div>
    );
};
