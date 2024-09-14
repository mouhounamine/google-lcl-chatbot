"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const HistoryPanel = () => {
  const [conversations] = useState([
    { id: 1, title: "Session du 10 septembre 2023" },
    { id: 2, title: "Session du 12 septembre 2023" },
    { id: 3, title: "Session du 14 septembre 2023" },
  ]);

  return (
    <section className="h-full bg-white p-4 rounded-3xl flex flex-col justify-between overflow-hidden">
      <div>
        <h2 className="text-lg font-bold mb-4 text-center">
          Historique des discussions
        </h2>
        <span className="space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-white p-4 rounded-md shadow-md"
            >
              <h3 className="text-md font-medium">{conversation.title}</h3>
            </div>
          ))}
        </span>
      </div>
      <div className="border-2 border-red-600 h-[10%] w-full">
        <Button className="grid place-content-center">Upgrade</Button>
      </div>
    </section>
  );
};

export default HistoryPanel;
