import { useRecoilValue } from "recoil";
import { memberProduceState } from "../../atoms/member";
import { ProduceType } from "../../data/products";

export const CredentialIssued = () => {
    const memberProduceType = useRecoilValue(memberProduceState);
    return (
        <div className="w-full flex flex-row items-center">
            <div className="font-light leading-tight text-lg w-full">
                {`Credential issued by the`}
                <br />
                {memberProduceType === ProduceType.CORN
                    ? `Corndog Millionaires`
                    : `Agrio Farming Community`}
            </div>
            {memberProduceType === ProduceType.CORN ? (
                <img
                    src="/images/corndog-millionaires.jpg"
                    className="h-12 rounded-lg"
                />
            ) : (
                <img src="/images/agrio.jpeg" className="h-12 rounded-lg" />
            )}
        </div>
    );
};
