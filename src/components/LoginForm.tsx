'use client';

import { FormEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Validators } from 'tiny-validation';
import { Button } from './common/forms/Button';
import TextInput from './common/forms/TextInput';
import { useForm } from '@/hooks/useForm';
import { getSupabase } from '@/lib/client_utils';
import { AuthError } from '@supabase/supabase-js';
const { isEmail, isPresent, minChars } = Validators;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const supabase = getSupabase();
  const router = useRouter();

  const submit = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.log({ data, error });
    if (error) {
      throw error;
    }
    if (!data.user) {
      throw new AuthError('Could not sign in with those credentials');
    }
    location.href = '/';
  };

  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    isDisabled,
    values,
    errors,
    error
  } = useForm({
    onSubmit: submit,
    stableSchema,
    initialValues: { email: '', password: '' }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex grow flex-col gap-4  px-8 py-8 sm:px-16"
    >
      <div>
        <TextInput
          name="email"
          type="email"
          label="✉️ &nbsp;Email Address"
          value={values.email}
          onChange={handleChange('email')}
          isRequired
          placeholder="panic@thedis.co"
          autoComplete="email"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <TextInput
          name="password"
          type="password"
          label="🔑 &nbsp;password"
          value={values.password}
          onChange={handleChange('password')}
          isRequired
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {errors.base ? (
        <div className="text-xs text-red-400">⚠️&nbsp;&nbsp;{errors.base}</div>
      ) : null}
      <Button
        className="mt-auto"
        type="submit"
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
      >
        Sign In
      </Button>
      <p className=" text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-gray-200">
          Sign up
        </Link>{' '}
        for free.
      </p>
    </form>
  );
}

const stableSchema = {
  email: [isPresent(), isEmail()],
  //TODO: Make this more secure
  password: [isPresent(), minChars(10)]
};
