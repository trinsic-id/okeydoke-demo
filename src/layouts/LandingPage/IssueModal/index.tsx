import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { X } from "react-feather";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinkit";
import { useRecoilState } from "recoil";
import {
    isIssueModalVisibleState,
    isIssueSuccessModalVisibleState,
} from "../../../atoms/modals";
import { useLockBg } from "../../../hooks/custom/useLockBackground";
import EmailInput from "./EmailInput";

const Animations = {
    container: {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    },
    inputContainer: {
        hidden: {
            y: 200,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
    },
};

export const validateEmail = (email: string) => {
    let regexEmail =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (email.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
};

interface IssueValues {
    email: string;
    name: string;
    grade: string;
    type: string;
}

const handleIssueCredential = async (
    email: IssueValues["email"],
    name: IssueValues["name"],
    grade: IssueValues["grade"],
    type: IssueValues["type"]
): Promise<{
    success: boolean;
}> => {
    let url = "https://okeydokeissuer.azurewebsites.net/api/issue";
    url += `?email=${encodeURIComponent(email)}&name=${encodeURI(
        name
    )}&grade=${grade}&foodType=${type}`;
    const response = await fetch(url, { method: "POST" });
    const wnd: any = window;
    wnd.blah = response;

    // We expect a response in the form of { success: boolean, error?: string }
    // If there was an error here, throw it so that the React mutation can handle it
    let json = await response.json();
    if (!json.success) {
        throw new Error(json.error)
    }
    else {
        return json;
    }
};

export const IssueModal = () => {
    const [isVisible, setModalVisible] = useRecoilState(
        isIssueModalVisibleState
    );
    const [isSuccessVisible, setSuccessModalVisible] = useRecoilState(
        isIssueSuccessModalVisibleState
    );

    useLockBg(isVisible);

    const [grade, setGrade] = useState("A");
    const [produceType, setProduceType] = useState("Artichoke");
    const [farmerName, setFarmerName] = useState("John Doe");
    const [userEmail, setUserEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (isVisible) {
            setUserEmail("");
            setProduceType(Math.random() < 0.5 ? "Artichoke" : "Corn");
            setFarmerName(Math.random() < 0.5 ? "John Doe " : "Jane Doe");

            const gradeRand = Math.random();
            if (gradeRand < 0.33) setGrade("A");
            else if (gradeRand < 0.66) setGrade("B");
            else setGrade("C");
        }
    }, [isVisible]);

    const isEmailValid = useMemo(() => {
        if (userEmail.length === 0) return true;
        return validateEmail(userEmail);
    }, [userEmail]);

    const isNameValid = useMemo(() => {
        return farmerName.length > 0 && farmerName.length < 100;
    }, [farmerName]);

    const {
        isLoading,
        error,
        isError,
        isSuccess,
        reset,
        mutate: issueCredential,
    } = useMutation(({ email, name, grade, type }: IssueValues) =>
        handleIssueCredential(email, name, grade, type)
    );

    useEffect(() => {
        if (isSuccess && isVisible) {
            setModalVisible(false);
            reset();

            setTimeout(() => {
                setSuccessModalVisible(true);
            }, 200);
        }
    }, [isSuccess, isVisible]);

    const buttonEnabled = useMemo(() => {
        return (
            !isLoading && isNameValid && isEmailValid && userEmail.length > 0
        );
    }, [isLoading, isNameValid, isEmailValid, userEmail]);

    return (
        <div className="max-w-x2s overflow-hidden md:max-w-xs">
            <AnimatePresence>
                {isVisible ? (
                    <motion.div
                        className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center"
                        variants={Animations.container}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div
                            className="absolute top-0 bottom-0 left-0 right-0 z-30 cursor-pointer bg-black bg-opacity-50"
                            onClick={() => {
                                setModalVisible(false);
                            }}
                        ></div>
                        <div className="z-40 flex w-full items-center justify-center p-4">
                            <motion.div
                                className="w-full max-w-md rounded-lg bg-white shadow-lg"
                                variants={Animations.inputContainer}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-row items-center">
                                            <h6 className="text-xl font-semibold text-black">
                                                Auditors R'Us
                                            </h6>
                                        </div>
                                        <button
                                            className="ml-6 text-gray-50 focus:outline-none"
                                            onClick={() => {
                                                setModalVisible(false);
                                            }}
                                        >
                                            <X
                                                className="stroke-black hover:stroke-red-500"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-4 flex w-full flex-col items-start space-y-4 pt-2">
                                        <span>
                                            We've found your profile; please
                                            make sure your info is correct
                                        </span>
                                        <div className="w-full">
                                            <div className="mb-[-10]">
                                                Full Name
                                            </div>
                                            <div className="w-full rounded-lg bg-gray-200 p-4 text-center text-xl">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    aria-autoComplete="off"
                                                    className="w-full bg-gray-200 text-center"
                                                    value={farmerName}
                                                    onChange={(ev) =>
                                                        setFarmerName(
                                                            ev.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="text">
                                                Produce Type
                                            </div>
                                            <div className="w-full rounded-lg bg-gray-200 p-4 text-center text-xl">
                                                {produceType}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="text">
                                                Produce Grade
                                            </div>
                                            <div className="w-full rounded-lg bg-gray-200 p-4 text-center text-xl">
                                                Grade {grade}
                                            </div>
                                        </div>
                                        <div className="h-[1px] w-full bg-gray-500"></div>
                                        <hr />
                                        <EmailInput
                                            value={userEmail}
                                            onChange={setUserEmail}
                                            isValid={isEmailValid}
                                        />
                                        <button
                                            className={`group flex h-full w-full flex-row items-center space-x-6 rounded-lg
                                            px-4 py-3 text-white ${
                                                buttonEnabled
                                                    ? "bg-blue-500 hover:border-2 hover:border-blue-500 hover:bg-white hover:py-2.5 hover:text-blue-500"
                                                    : "bg-blue-300"
                                            }`}
                                            onClick={() => {
                                                if (!isLoading) {
                                                    issueCredential({
                                                        email: userEmail,
                                                        name: farmerName,
                                                        grade: "C",
                                                        type: "Artichoke",
                                                    });
                                                }
                                            }}
                                            disabled={!buttonEnabled}
                                        >
                                            <div className="h-full w-6">
                                                {isLoading && (
                                                    <Spinner
                                                        color="white"
                                                        fadeIn="none"
                                                        name="ball-spin-fade-loader"
                                                        className="ml-4 mt-2 scale-[45%] whitespace-nowrap"
                                                    />
                                                )}
                                                {!isLoading && (
                                                    <img
                                                        src="images/trinsic-logo-white.png"
                                                        className={`block w-6 ${
                                                            buttonEnabled
                                                                ? "group-hover:hidden"
                                                                : ""
                                                        }`}
                                                    />
                                                )}
                                                {!isLoading && (
                                                    <img
                                                        src="images/trinsic-logo-blue.png"
                                                        className={`hidden h-[35.22px] w-6 ${
                                                            buttonEnabled
                                                                ? "group-hover:block"
                                                                : ""
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 pr-12 text-lg font-medium">
                                                Receive your credential
                                            </div>
                                        </button>
                                        {isError && (
                                            <div className="group flex h-full w-full flex-row items-center space-x-6 rounded-lg
                                            px-4 py-3 bg-red-100">
                                                <span className="text-red-500">
                                                    {error instanceof Error ? error.message : "Error"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};
