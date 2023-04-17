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

import {AlertCircle} from "react-feather";
import {useToggle} from "react-use";

interface EmailInputProps {
    onChange: (value: string) => void;
    value: string;
    isValid: boolean;
}

export default function EmailInput({onChange, value, isValid} : EmailInputProps) {
    return (
        <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type="text"
                    autoComplete="off"
                    className={`block w-full rounded-md border-0 py-1.5 pr-10 pl-1 ring-1 ring-inset sm:text-sm sm:leading-6
                     ${ !isValid ? 'ring-red-400 text-red-900 placeholder:text-red-400' : 'ring-gray-400 text-gray-900 placeholder:text-gray-400'}` }
                    placeholder="you@example.com"
                    onChange={(ev) => {onChange(ev.target.value)}}
                    value={value}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {!isValid && <AlertCircle className="h-5 w-5 text-red-500" />}
                </div>
            </div>
            {!isValid &&
            <p className="mt-2 text-sm text-red-600" id="email-error">
                Not a valid email address.
            </p>}
        </div>
    )
}
