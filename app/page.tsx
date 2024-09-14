import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AuthProvider } from "@/context/auth-context";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <AuthProvider>
      <main className="flex h-full flex-col items-center justify-center bg-[#232D7E]">
        <div className="space-y-6 text-center">
          <Image src="/LCL-logo.png" alt="logo" width={300} height={300} />
          <p className={cn(font.className, "text-xl text-white")}>
            Ma vie, Ma ville, Ma Banque.
          </p>
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
    </AuthProvider>
  );
}
