'use client';
import { FComponent } from '@/types/common';
import * as React from 'react';
import { AriaButtonProps, useButton } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

export const IconButton: FComponent<AriaButtonProps, HTMLButtonElement> = (
  props,
  ref
) => {
  const fwRef = useObjectRef(ref);
  const { buttonProps } = useButton(props, fwRef);
  console.log({ buttonProps });

  return (
    <button className={props.className} {...buttonProps}>
      {props.children}
    </button>
  );
};
