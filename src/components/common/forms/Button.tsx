import * as React from 'react';
import { FComponent } from '@/types/common';
import { AriaButtonProps, useButton } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';
import clsx from 'clsx';

const ButtonWrapper: FComponent<
  AriaButtonProps & { isSubmitting?: boolean },
  HTMLButtonElement
> = ({ children, className, ...ariaButtonProps }, ref) => {
  const fwRef = useObjectRef(ref);
  const { buttonProps } = useButton(ariaButtonProps, fwRef);
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        'flex h-10 w-full cursor-pointer items-center justify-center  rounded-md border border-gray-500 bg-stratos-800 text-sm text-gray-300 transition-all hover:border-gray-400 hover:text-gray-100 focus:outline-none disabled:cursor-default disabled:border-gray-900 disabled:bg-opacity-70 disabled:text-gray-400'
      )}
    >
      {children}
    </button>
  );
};

export const Button = React.forwardRef(ButtonWrapper);
