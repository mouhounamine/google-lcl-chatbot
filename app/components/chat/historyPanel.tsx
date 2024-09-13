"use client";

import React, { useState } from "react";

const HistoryPanel = () => {
  const [conversations] = useState([
    { id: 1, title: "Session du 10 septembre 2023" },
    { id: 2, title: "Session du 12 septembre 2023" },
    { id: 3, title: "Session du 14 septembre 2023" },
  ]);

  return (
    <div className="h-full bg-green-400 hidden sm:block md:block p-4">
      <h2 className="text-lg font-bold mb-4">Historique des discussions</h2>
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h3 className="text-md font-medium">{conversation.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
