"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const SocialLogin = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full bg-white"
        size="lg"
        onClick={() => {
          console.log("Google Login");
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full bg-white"
        size="lg"
        onClick={() => {
          console.log("Github Login");
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
