
import { useRecoilValue } from "recoil";
import { userCredentialState } from "../../atoms/user";

export const MemberLevelError = () => {
  const userCredential = useRecoilValue(userCredentialState);

  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="rounded-lg w-1/2 bg-gray-400">Go back</div>
      <div className="rounded-lg w-1/2 bg-gray-400">Try again</div>
    </div>
  );
};
