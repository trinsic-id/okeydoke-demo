import { useSetRecoilState } from "recoil";
import { isIssueModalVisibleState } from "../../../atoms/modals";
import { Action } from "./Action";

export default function ActionList() {
    const setIssueModalVisible = useSetRecoilState(isIssueModalVisibleState);

    return (
        <div className="mt-24 w-full md:mt-48">
            <div className="flex flex-col items-center justify-center gap-14 align-middle md:flex-row md:gap-24">
                <Action
                    text="Get your Farmerpass"
                    image="images/landing/farm.jpg"
                    onClick={() => {
                        setIssueModalVisible(true);
                    }}
                />
                <a href="/shop">
                    <Action
                        text="Buy discounted seeds"
                        image="images/artichokes/big-heart.jpg"
                        onClick={() => {}}
                    />
                </a>
            </div>
        </div>
    );
}

/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">*/
