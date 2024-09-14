"use client";

import React, { useEffect, useState } from "react";
import HistoryPanel from "./historyPanel";
import PromptPanel from "./promptPanel";
import ChatPanel from "./chatPanel";

const Chat = () => {
  const [prompt] = useState("Hello");
  const [prompts] = useState([prompt]);

  useEffect(() => {
    console.log("Hello coté CHAT ", prompt);
    prompts.push(prompt);
  }, [prompt]);

  return (
    <section className="gap-5 h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#406be9] to-[#6363f7] flex flex-row w-full p-5">
      <div className=" w-[20%]">
        <HistoryPanel />
      </div>
      <div className=" w-[80%]">
        <ChatPanel prompts={prompts} />
        <PromptPanel prompts={prompts} />
      </div>
    </section>
  );
};

export default Chat;
