const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#232D7E]">
      {children}
    </div>
  );
};

export default AuthLayout;
