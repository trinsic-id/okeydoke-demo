import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { useResetRecoilState } from "recoil";
import { authSettingsState } from "../../../atoms/authService";
import { LoadingItem } from "../../../components/Shop/LoadingItem";

export const ResetEcosystem = () => {
    const [isEcosystemResetting, toggleEcosystemResetting] = useToggle(false);
    const resetAuthSettings = useResetRecoilState(authSettingsState);
    const navigate = useNavigate();

    useEffect(() => {
        resetAuthSettings();
        toggleEcosystemResetting(true);
    }, []);

    return (
        <div className="flex h-full w-full flex-col place-content-center items-center space-y-5 p-3">
            <LoadingItem
                isLoading={isEcosystemResetting}
                text={"Resetting Ecosystem"}
                onNext={() => {
                    navigate("/");
                }}
            />
        </div>
    );
};
