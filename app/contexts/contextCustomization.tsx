"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CustomContextType {
  currentPrompt: Message;
  setCurrentPrompt: (value: Message) => void;
  prompts: Message[];
  setPrompts: (value: Message[]) => void;
}

interface Message {
  sender: string; // To distinguish between user and bot messages
  avatarUrl: string;
  message: string;
  timestamp: string;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

export const CustomProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPrompt, setCurrentPrompt] = useState<Message>({
    sender: "bot",
    avatarUrl: "https://example.com/avatar.png", // URL de l'avatar par défaut
    message: "Hello",
    timestamp: new Date().toISOString(),
  });

  const [prompts, setPrompts] = useState<Message[]>([currentPrompt]); // Ajout de la spécification de type

  return (
    <CustomContext.Provider
      value={{
        currentPrompt,
        setCurrentPrompt,
        prompts,
        setPrompts,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = (): CustomContextType => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error("useCustomContext must be used within a CustomProvider");
  }
  return context;
};
