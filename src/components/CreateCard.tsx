'use client';

import * as React from 'react';
import { FComponent } from '@/types/common';
import { IconButton } from './common/Button';
import { PlusIcon } from './common/Icons';
import { Modal } from './common/Modal';
import { CreateCardForm } from './CreateCardForm';

export const CreateCard: FComponent<{ deckId: string; position: number }> = ({
  deckId,
  position
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <IconButton
        onPress={toggle}
        className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white"
      >
        <PlusIcon className="h-6 w-6 stroke-2" />
      </IconButton>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        title="Add Card"
        description="Add a new card to this deck"
        isTitleHidden={true}
        isDescriptionHidden={true}
      >
        <CreateCardForm
          deckId={deckId}
          position={position}
          onClose={(id: string) => {
            location.reload();
            toggle();
          }}
        />
      </Modal>
    </>
  );
};
