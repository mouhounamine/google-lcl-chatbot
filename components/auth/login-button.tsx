"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter();

  const OnClick = () => {
    router.push("/login");
    console.log("THE LOGIN BUTTON HAS BEEN CLICKED");
  };

  if (mode === "modal") {
    return <span>Here is the login modal</span>;
  }
  return (
    <span onClick={OnClick} className="cursor-pointer">
      {children}
    </span>
  );
};
