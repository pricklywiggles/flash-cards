'use client';
import { useForm } from '@/hooks/useForm';
import { Button } from './forms/Button';
import {
  isPresent,
  maxChars,
  minChars
} from 'tiny-validation/build/main/lib/validators';
import { FComponent, Nullable } from '@/types/common';
import TextInput from './forms/TextInput';
import { isOptionalUrl, optionalMinChars } from '@/lib/validators';
import { Deck } from '@prisma/client';

export type DeckDetails = {
  id: string;
  name: string;
  description: Nullable<string>;
  imageUrl: Nullable<string>;
};

export const EditDeckDetailsForm: FComponent<
  {
    onSuccess?: (deck: Deck) => void;
  } & DeckDetails
> = ({ id, name, description, imageUrl, onSuccess }) => {
  const submit = async ({
    name,
    description,
    imageUrl
  }: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    return fetch(`/api/decks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        description,
        imageUrl
      })
    }).then(async (res) => {
      if (res.status === 200) {
        const { data: deck } = await res.json();
        console.log({ deck });
        onSuccess?.(deck);
      } else {
        const { error } = await res.json();
        console.error({ error });
        throw new Error(error);
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
      name,
      description: description || '',
      imageUrl: imageUrl || ''
    }
  });
  console.log(values);
  console.log(errors);

  return (
    <div className="w-96 pt-6">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          label="Deck name"
          data-1p-ignore
          value={values.name}
          onChange={handleChange('name')}
          placeholder="Useful math formulas"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        <TextInput
          name="description"
          label="Description"
          value={values.description}
          onChange={handleChange('description')}
          placeholder="50 calcululs and algebra formulas from high school and college."
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        <TextInput
          name="imageUrl"
          label="imageUrl"
          value={values.imageUrl}
          onChange={handleChange('imageUrl')}
          placeholder="https://example.com/image.png"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
        <div className="text-sm text-red-500">{errors.base}</div>

        <Button type="submit" isDisabled={isDisabled}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  );
};

const stableSchema = {
  name: [isPresent(), minChars(10), maxChars(50)],
  description: [optionalMinChars(10), maxChars(255)],
  imageUrl: [isOptionalUrl]
};
