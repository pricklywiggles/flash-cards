import Image from 'next/image';
import Form from '@/components/LoginForm';
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';
import SlateCard from '@/components/SlateCard';
import logo from '@/assets/flash_logo.png';
import { AuthPageContainer } from '../containers';

export default function Register() {
  return (
    <AuthPageContainer>
      <div className="flex flex-col items-center justify-center gap-1 pb-10 sm:gap-2 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        <div className="">
          <span className="font-bold text-yellow-400">Create</span> flash decks
        </div>
        <div className="">
          <span className="font-bold text-yellow-400">Track</span> your progress
        </div>
        <div className="">
          <span className="font-bold text-yellow-400">Save</span> your favorites
        </div>
        <Image
          className="order-first mb-6 mt-6 h-20 w-20 sm:order-last sm:mb-0 sm:h-24 sm:w-24 md:mb-10 md:h-28 md:w-28 lg:h-32 lg:w-32"
          alt="Flash decks logo"
          priority
          src={logo}
        />
      </div>
      <SlateCard isGlowing>
        <div className="flex flex-col items-center justify-center space-y-1 border-b border-gray-700  px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-400">Create an account</p>
        </div>
        <SignupForm />
      </SlateCard>
    </AuthPageContainer>
  );
}
