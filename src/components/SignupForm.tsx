'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './forms/Button';
import TextInput from './forms/TextInput';
import { Validators, useForm } from 'controlled-form-hook';
const { isEmail, isPresent, minChars } = Validators;

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = ({ email, password }: { email: string; password: string }) =>
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(async (res) => {
      if (res.status === 200) {
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const { error } = await res.json();
        console.error(error);
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
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          placeholder="panic@thedis.co"
          autoComplete="email"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs uppercase text-gray-300"
        >
          Password
        </label>
        <TextInput
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-600 bg-black px-3 py-2 text-gray-300 placeholder-gray-500 shadow-sm focus:border-gray-200 focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <Button type="submit" isDisabled={isDisabled} isSubmitting={isSubmitting}>
        Sign up
      </Button>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-gray-200">
          Sign in
        </Link>{' '}
        instead.
      </p>
    </form>
  );
}

const stableSchema = {
  email: [isPresent(), isEmail()],
  //TODO: Make this more secure
  password: [isPresent(), minChars(10)]
};
