"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React, { useState } from "react";

interface Props {
  prompts: string[];
}

const PromptPanel: React.FC<Props> = ({ prompts }) => {
  const [inputValue, setInputValue] = useState<string>(""); // Gérer l'état de l'input localement

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Mettre à jour localement l'input
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim()) {
      prompts.push(inputValue); // Met à jour l'état parent avec le nouveau tableau de prompts
      console.log("PROMPTS ---> [prompts]", inputValue);
    }
  };

  return (
    <section className="border-2 border-blue-700 h-[10%] grid place-content-center">
      <form onSubmit={onSubmit}>
        <PlaceholdersAndVanishInput
          onSubmit={onSubmit}
          placeholders={["comment puis-je vous aider ?"]}
          onChange={handleChange} // Gère les changements dans l'input
        />
      </form>
    </section>
  );
};

export default PromptPanel;
