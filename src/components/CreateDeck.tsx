'use client';

import * as React from 'react';
import { FComponent } from '@/types/common';
import { IconButton } from './common/Button';
import { PlusIcon } from './common/Icons';
import { Modal } from './common/Modal';
import { CreateDeckForm } from './CreateDeckForm';

export const CreateDeck: FComponent<{}> = ({}) => {
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
        title="Add Deck"
        description="Add a new deck to your collection"
        isTitleHidden={true}
        isDescriptionHidden={true}
      >
        <CreateDeckForm
          onClose={(id: string) => {
            toggle();
            window.location.href = `/decks/${id}`;
          }}
        />
      </Modal>
    </>
  );
};
