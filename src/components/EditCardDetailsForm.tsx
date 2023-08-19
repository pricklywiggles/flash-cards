'use client';
import { useForm } from '@/hooks/useForm';
import { Button } from './common/forms/Button';
import {
  isPresent,
  maxChars,
  minChars
} from 'tiny-validation/build/main/lib/validators';
import { FComponent, Nullable } from '@/types/common';
import TextInput from './common/forms/TextInput';
import { isOptionalUrl, optionalMinChars } from '@/lib/validators';

export type CardDetails = {
  id: string;
  front: string;
  back: string;
};

export const EditCardDetailsForm: FComponent<
  {
    onSuccess?: () => void;
  } & CardDetails
> = ({ id, front, back, onSuccess }) => {
  const submit = async (card: { front: string; back: string }) => {
    console.log('WTF');
    return fetch(`/api/cards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, ...card })
    }).then(async (res) => {
      if (res.status === 200) {
        onSuccess?.();
      } else {
        const { error } = await res.json();
        console.error(error);
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
      front,
      back
    }
  });
  console.log(values);
  console.log(errors);

  return (
    <div className="w-96 pt-6">
      <form className="grid gap-4" onSubmit={handleSubmit}>
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

        <Button type="submit" isDisabled={isDisabled}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  );
};

const stableSchema = {
  front: [isPresent(), minChars(5), maxChars(500)],
  back: [isPresent(), minChars(5), maxChars(500)]
};
