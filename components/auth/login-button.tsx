"use client";

import { TransitionLink } from "./LinkTransition";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  if (mode === "modal") {
    return <span>Here is the login modal</span>;
  }
  return (
    <TransitionLink
      className="bg-white rounded-full drop-shadow-md hover:bg-slate-300"
      href="/login"
    >
      Home
    </TransitionLink>
  );
};
