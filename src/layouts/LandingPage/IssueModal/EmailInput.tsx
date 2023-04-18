/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { AlertCircle } from "react-feather";

interface EmailInputProps {
    onChange: (value: string) => void;
    value: string;
    isValid: boolean;
    label?: string;
    errMsg?: string;
}

export default function EmailInput({
    onChange,
    value,
    isValid,
    label = "Email",
    errMsg = "Not a valid email address",
}: EmailInputProps) {
    return (
        <div className="relative flex w-full flex-col">
            <input
                autoComplete="off"
                className={`peer w-full rounded-lg border p-3 transition-all placeholder:text-[#5F7186] ${
                    !isValid
                        ? "border-red-500 text-red-500"
                        : "border-[#5F7186] border-opacity-10 focus:border-blue-500 focus:text-blue-500"
                }`}
                placeholder={label}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value);
                }}
            />

            <div
                className={`pt-1 text-xs text-red-500 ${
                    !isValid ? "opacity-100" : "opacity-0"
                }`}
            >
                {errMsg}
            </div>

            <span
                className={`pointer-events-none absolute left-2 -top-2 bg-white px-1 text-xs ${
                    value.length > 0 ? "opacity-100" : "opacity-0"
                } peer-focus:opacity-100 ${
                    !isValid
                        ? "text-red-500"
                        : "text-[#5F7186] peer-focus:text-blue-500"
                }`}
            >
                {label}
            </span>

            <div className="absolute  top-0 bottom-5 right-0 flex flex-row items-center gap-1 p-3">
                <div
                    className={`flex h-full w-full place-content-center items-center ${
                        !isValid && value.length > 0
                            ? "opacity-100"
                            : "opacity-0"
                    }`}
                >
                    <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                </div>
            </div>
        </div>
    );
}
