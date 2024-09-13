"use client";

import React, { useState } from "react";
import HistoryPanel from "./historyPanel";
import ChatPanel from "./chatPanel";
import PromptPanel from "./promptPanel";

const Chat = () => {
  const [prompt, setPrompt] = useState("Initial prompt");

  return (
    <section className="border-2 h-screen border-green-600 flex flex-row w-full p-5">
      <div className="border-2 border-red-500 w-[20%]">
        <HistoryPanel />
      </div>
      <div className="border-2 border-yellow-500 w-[80%]">
        <ChatPanel prompt={prompt} />
        <PromptPanel setPrompt={setPrompt} prompt={prompt} />
      </div>
    </section>
  );
};

export default Chat;
