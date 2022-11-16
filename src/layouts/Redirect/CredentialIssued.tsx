import { CheckSquare } from "react-feather";
import { useRecoilValue } from "recoil";
import { memberProduceState } from "../../atoms/member";
import { ProduceType } from "../../data/products";

export const CredentialIssued = () => {
    const memberProduceType = useRecoilValue(memberProduceState);
    return (
        <div className="flex flex-col items-start space-y-4">
            <div className="w-full flex flex-row items-center">
                <div className="font-light leading-tight text-base sm:text-lg w-full">
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
            <div className="w-full flex flex-row items-center justify-between">
                <div className="font-light leading-tight text-base sm:text-lg w-full">
                    Revocation Status:
                </div>
                <div className="leading-tight text-base sm:text-lg font-medium text-green-600 h-8 w-28 rounded-lg py-4 px-12 flex items-center place-content-center bg-green-200 border-green-600 border-2">
                    Valid
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="font-light leading-tight text-base sm:text-lg w-full">
                    Trust registry:
                </div>
                <div className="leading-tight text-base sm:text-lg font-medium text-green-600 h-8 w-28 rounded-lg py-4 px-12 flex items-center place-content-center bg-green-200 border-green-600 border-2">
                    Valid
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="font-light leading-tight text-base sm:text-lg w-full">
                    Schema validation:
                </div>
                <div className="leading-tight text-base sm:text-lg font-medium text-green-600 h-8 w-28 rounded-lg py-4 px-12 flex items-center place-content-center bg-green-200 border-green-600 border-2">
                    Valid
                </div>
            </div>
        </div>
    );
};
