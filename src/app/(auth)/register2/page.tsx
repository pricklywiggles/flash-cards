import Image from 'next/image';
import Form from '@/components/LoginForm';
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';
import SlateCard from '@/components/SlateCard';
import logo from '@/assets/flash_logo.png';
import { AuthPageContainer } from '../containers';

export default function Register() {
  return (
    <div className="flex h-full w-screen flex-col items-center ">
      <div className="flex flex-col items-center justify-center">
        {/* <div className="font-bold text-yellow-400">Create flash decks</div>
        <div className="font-bold text-yellow-400">Track your progress</div> */}
        <div className="h-[20rem] bg-blue-200 font-bold text-black">
          Save your favorites
        </div>
        {/* <Image
          className="order-first mb-6 mt-6 h-20 w-20 sm:order-last sm:mb-0 sm:h-24 sm:w-24 md:mb-10 md:h-28 md:w-28 lg:h-32 lg:w-32"
          alt="Flash decks logo"
          priority
          src={logo}
        /> */}
      </div>
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full w-full flex-col">
          {/* <div className="flex flex-col items-center justify-center ">
            <h3 className="text-xl font-semibold">Sign Up</h3>
            <p className="text-sm text-gray-400">Create an account</p>
          </div>
          <SignupForm /> */}
          <div className=" h-28 bg-yellow-100">something</div>
        </div>
      </div>
    </div>
  );
}
