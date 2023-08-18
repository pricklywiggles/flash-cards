import { FComponent } from '@/types/common';

const SlateCard: FComponent<{ isGlowing?: boolean }> = ({
  isGlowing = false,
  children
}) => {
  return (
    <div className="relative flex h-full w-full flex-col sm:h-auto sm:w-auto">
      {isGlowing ? (
        <div className="absolute inset-0 animate-pulse-slow rounded-t-[2.6rem] bg-gray-500 blur sm:rounded-sm" />
      ) : null}
      <div className="isolate flex h-full w-full max-w-md flex-col overflow-hidden rounded-t-[3rem] border border-gray-700 bg-gradient-to-t from-slate-800 via-slate-900 to-slate-950 shadow-xl sm:h-auto sm:rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default SlateCard;
