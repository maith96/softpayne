export function InputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">{children}</span>
      </div>
    </div>
  );
}
