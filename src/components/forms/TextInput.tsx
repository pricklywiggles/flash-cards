import * as React from "react";
import { FComponent } from "@/types/common";
import { AriaTextFieldProps, useButton, useTextField } from "react-aria";
import { useObjectRef } from "@react-aria/utils";

const TextInput: FComponent<AriaTextFieldProps, HTMLInputElement> = (
  { children, autoComplete = "off", ...ariaTextInputProps },
  ref,
) => {
  const fwRef = useObjectRef(ref);

  const { inputProps, descriptionProps, errorMessageProps, labelProps } =
    useTextField(ariaTextInputProps, fwRef);
  console.log({ labelProps });
  return (
    <>
      <label {...labelProps} className="block text-xs uppercase text-gray-300">
        {ariaTextInputProps.label}
      </label>
      <input
        {...inputProps}
        className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
      >
        {children}
      </input>
      {ariaTextInputProps.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {ariaTextInputProps.description}
        </div>
      )}
      {ariaTextInputProps.errorMessage && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {ariaTextInputProps.errorMessage}
        </div>
      )}
    </>
  );
};

export default React.forwardRef(TextInput);
