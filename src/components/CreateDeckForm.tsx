'use client';
import { useForm } from '@/hooks/useForm';
import { Button } from './forms/Button';
import {
  isPresent,
  maxChars,
  minChars
} from 'tiny-validation/build/main/lib/validators';
import { FComponent } from '@/types/common';
import TextInput from './forms/TextInput';

export const CreateDeckForm: FComponent<{ onClose?: (id: string) => void }> = ({
  onClose
}) => {
  const submit = async ({ name }: { name: string }) => {
    return fetch('/api/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then(async (res) => {
      const { data: deck, error } = await res.json();
      console.log({ deck });
      if (res.status === 200) {
        onClose?.(deck.id);
      } else {
        console.error({ error: deck });
      }
    });
  };

  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    isDisabled,
    values,
    errors
  } = useForm({
    onSubmit: submit,
    stableSchema,
    initialValues: {
      name: ''
    }
  });

  return (
    <div className="">
      <div id="deckname-label">What is the topic of this flash deck?</div>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          aria-labelledby="deckname-label"
          data-1p-ignore
          value={values.name}
          onChange={handleChange('name')}
          placeholder="Useful math formulas"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />

        <Button type="submit" isSubmitting={isSubmitting}>
          Create
        </Button>
      </form>
    </div>
  );
};

const stableSchema = {
  name: [isPresent(), minChars(10), maxChars(50)]
  // description: [isPresent(), minChars(10), maxChars(255)]
};
