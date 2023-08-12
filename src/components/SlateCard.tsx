import { FComponent } from "@/types/common";

const SlateCard: FComponent<{ isGlowing?: boolean }> = ({
  isGlowing = false,
  children,
}) => {
  return (
    <div className="relative">
      {isGlowing ? (
        <div className="absolute inset-0 animate-pulse-slow bg-gray-500 blur" />
      ) : null}
      <div className="isolate w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-t from-slate-800 via-slate-900 to-slate-950 shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default SlateCard;
