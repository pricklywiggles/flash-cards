import * as React from 'react';
import { FComponent } from '@/types/common';
import { AriaButtonProps, useButton } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

const ButtonWrapper: FComponent<
  AriaButtonProps & { isSubmitting?: boolean },
  HTMLButtonElement
> = ({ isSubmitting, children, ...ariaButtonProps }, ref) => {
  const fwRef = useObjectRef(ref);
  const { buttonProps } = useButton(ariaButtonProps, fwRef);
  return (
    <button
      {...buttonProps}
      className={`${
        isSubmitting
          ? 'cursor-not-allowed border-gray-200 bg-gray-100'
          : 'cursor-pointer border-gray-500 bg-stratos-800 text-gray-300 hover:border-gray-400 hover:text-gray-100'
      } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
    >
      {isSubmitting ? <div color="#808080">Loading</div> : children}
    </button>
  );
};

export const Button = React.forwardRef(ButtonWrapper);
