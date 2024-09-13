import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          "flex items-center gap-2 text-3xl font-semibold text-sky-400",
          font.className
        )}
      >
        LCL
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
