'use client';

import { FormEventHandler, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Validators } from 'tiny-validation';
import { Button } from './forms/Button';
import TextInput from './forms/TextInput';
import { useForm } from 'controlled-form-hook';
const { isEmail, isPresent, minChars } = Validators;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = ({ email, password }: { email: string; password: string }) =>
    signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    }).then((res) => {
      if (res?.error) {
        console.error(res.error);
      } else {
        router.refresh();
        // get the callbackUrl param from the current url
        const callbackUrl = new URL(window.location.href).searchParams.get(
          'callbackUrl'
        );
        router.push(callbackUrl || '/');
      }
    });

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
    initialValues: { email: '', password: '' }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4  px-4 py-8 sm:px-16"
    >
      <div>
        <TextInput
          name="email"
          type="email"
          label="Email Address"
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
          label="password"
          value={values.password}
          onChange={handleChange('password')}
          isRequired
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <Button type="submit" isDisabled={isDisabled} isSubmitting={isSubmitting}>
        Sign In
      </Button>
      <p className="text-center text-sm text-gray-400">
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
