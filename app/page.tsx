import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "./components/login-button";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#25358B] to-[#3B51D5]">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "flex items-center gap-2 text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-20 h-20 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
          LCL
        </h1>
        <p className="text-white text-lg">Ma ville, Ma vie, Ma Banque.</p>
        <div className="space-x-4">
          <LoginButton>
            <Button
              className="bg-white rounded-full drop-shadow-md hover:bg-slate-300 "
              size="lg"
            >
              Login
            </Button>
          </LoginButton>{" "}
        </div>
      </div>
    </main>
  );
}
