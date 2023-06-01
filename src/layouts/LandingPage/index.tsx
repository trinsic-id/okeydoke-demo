import ActionList from "./ActionList";
import { IssueModal } from "./IssueModal";
import { SuccessModal } from "./IssueModal/SuccessModal";

const LandingPage = () => {
    return (
        <div className="h-full w-full bg-light-bg">
            <div className="p-8 md:p-12">
                <div className="flex flex-col items-start gap-2">
                    <div className="text-4xl font-medium md:text-7xl">
                        OkeyDoke
                    </div>
                    <div className="pt-4 md:text-xl">
                        OkeyDoke is a network of verified farmers who get access
                        to exclusive discounts and opportunities.
                    </div>
                    <ActionList />
                </div>
                <div id="footer" className="">
                    OkeyDoke is a demo IDtech ecosystem for Trinsic.{" "}
                    <a
                        className="cursor-pointer text-text-inactive hover:text-text-active"
                        target="_blank"
                        href="https://github.com/trinsic-id/okeydoke-demo"
                    >
                        View the source on GitHub
                    </a>
                </div>
            </div>
            <IssueModal />
            <SuccessModal />
        </div>
    );
};

export default LandingPage;
