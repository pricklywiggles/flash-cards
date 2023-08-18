'use client';

import * as React from 'react';
import { FComponent } from '@/types/common';
import { IconButton } from './Button';
import { PencilIcon, PlusIcon } from './Icons';
import { Modal } from './Modal';
import { CardDetails, EditCardDetailsForm } from './EditCardDetailsForm';

export const EditCardDetails: FComponent<CardDetails> = ({
  className,
  ...cardDetails
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleSuccess = () => {
    setIsOpen(!isOpen);
    window.location.reload();
  };

  return (
    <>
      <IconButton onPress={() => setIsOpen(!isOpen)} className={className}>
        <PencilIcon className="h-6 w-6 stroke-2" />
      </IconButton>
      <Modal
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        title="Edit Card Details"
        description="Edit the details of this card"
        isDescriptionHidden={true}
      >
        <EditCardDetailsForm {...cardDetails} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};
