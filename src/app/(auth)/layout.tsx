import '@app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-stratos-900 " lang="en">
      <body
        className={clsx(inter.className, 'flex h-full flex-col text-gray-200')}
      >
        <Backdrop />
        <main className="isolate flex h-full flex-col">{children}</main>
      </body>
    </html>
  );
}

const Backdrop = () => (
  <div
    className="absolute inset-x-0 -z-50 transform-gpu overflow-hidden blur-[90px]"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%-11rem)] aspect-[1/1] w-full -translate-x-1/2 translate-y-1/2 rotate-[40deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-80  sm:opacity-70 md:opacity-50 lg:opacity-30"
      style={{
        clipPath:
          'polygon(7% 8%, 32% 2%, 30% 19%, 56% 8%, 58% 31%, 82% 20%, 22% 52%, 98% 24%, 81% 54%, 52% 99%, 71% 5%)'
      }}
    />
  </div>
);
