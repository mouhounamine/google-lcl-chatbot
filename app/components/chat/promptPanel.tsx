"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React from "react";

interface Props {
  setPrompt: (value: string) => void;
  prompt: string;
}

const PromptPanel: React.FC<Props> = ({ setPrompt, prompt }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Chang" + e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Prompt soumis :", prompt); // Affiche la valeur soumise
    setPrompt(prompt);
  };

  return (
    <section className="border-2 border-blue-700 h-[10%] grid place-content-center">
      <form onSubmit={onSubmit}>
        <PlaceholdersAndVanishInput
          placeholders={["comment puis-je vous aider ?"]}
          onChange={handleChange} // Gère les changements d'input
          onSubmit={onSubmit}
        />
      </form>
    </section>
  );
};

export default PromptPanel;
