'use client';

import * as React from 'react';
import { FComponent } from '@/types/common';
import { IconButton } from './common/Button';
import { PencilIcon, PlusIcon } from './common/Icons';
import { Modal } from './common/Modal';
import { CreateDeckForm } from './CreateDeckForm';
import { DeckDetails, EditDeckDetailsForm } from './EditDeckDetailsForm';

export const EditDeckDetails: FComponent<DeckDetails> = ({
  className,
  ...deckDetails
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
        title="Edit Deck Details"
        description="Edit the details of this deck"
        isDescriptionHidden={true}
      >
        <EditDeckDetailsForm {...deckDetails} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};
