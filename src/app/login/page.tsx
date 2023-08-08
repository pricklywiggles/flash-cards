import LoginForm from '@/components/LoginForm';
import SlateCard from '@/components/SlateCard';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <SlateCard isGlowing>
        <div className="flex flex-col items-center justify-center space-y-1 border-b border-gray-700  px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-400">
            Use your email and password to sign in
          </p>
        </div>
        <LoginForm />
      </SlateCard>
    </div>
  );
}
