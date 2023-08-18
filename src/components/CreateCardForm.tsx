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
import { Deck } from '@prisma/client';

export const CreateCardForm: FComponent<{
  deckId: string;
  position: number;
  onClose?: (id: string) => void;
}> = ({ onClose, deckId, position }) => {
  const submit = async (card: { front: string; back: string }) => {
    return fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...card, deckId: deckId, position: position })
    }).then(async (res) => {
      const { data, error } = await res.json();
      console.log({ data, error });
      if (res.ok) {
        onClose?.(data.id);
        return Promise.resolve(data);
      } else {
        console.error({ error });
        return Promise.reject(error);
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
      front: '',
      back: ''
    }
  });

  return (
    <div className="">
      <div>What is the topic of this flash deck?</div>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <TextInput
          name="front"
          aria-labelledby="cardfront-label"
          data-1p-ignore
          value={values.front}
          onChange={handleChange('front')}
          placeholder="What is twenty plus two?"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        <TextInput
          name="back"
          aria-labelledby="cardfback-label"
          data-1p-ignore
          value={values.back}
          onChange={handleChange('back')}
          placeholder="twenty two"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        <div className="text-sm text-red-500">{errors.base}</div>
        <Button type="submit" isSubmitting={isSubmitting}>
          Create
        </Button>
      </form>
    </div>
  );
};

const stableSchema = {
  front: [isPresent(), minChars(5), maxChars(500)],
  back: [isPresent(), minChars(5), maxChars(500)]
};
