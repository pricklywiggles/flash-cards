import Image from 'next/image';
import Form from '@/components/LoginForm';
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';
import SlateCard from '@/components/SlateCard';

export default function Register() {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <SlateCard isGlowing>
        <div className="flex flex-col items-center justify-center space-y-1 border-b border-gray-700  px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-400">Create an account</p>
        </div>
        <SignupForm />
      </SlateCard>
    </div>
  );
}
