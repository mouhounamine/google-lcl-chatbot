import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full min-h-screen h-full max-w-screen-xl px-2.5 md:px-10 grid place-items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
