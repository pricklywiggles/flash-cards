import LoginForm from '@/components/LoginForm';
import SlateCard from '@/components/SlateCard';
import Image from 'next/image';
import logo from '@/assets/flash_logo.png';

export default function Login() {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center ">
      <Image
        className="my-16 h-20 w-20"
        alt="Flash decks logo"
        priority
        src={logo}
      />
      <SlateCard isGlowing>
        <div className="flex flex-col items-center justify-center space-y-1 border-b border-gray-700  px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Welcome back!</h3>
          <p className="text-sm text-gray-400">
            Type the magic words to get back in here.
          </p>
        </div>
        <LoginForm />
      </SlateCard>
    </div>
  );
}
