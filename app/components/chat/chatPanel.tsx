import React, { useEffect, useState } from "react";
import axios from "axios";
import InstagramMessage from "../InstagramMessage";

interface Props {
  prompts: string[];
}

interface DialogflowResponse {
  responseId: string;
  queryResult: {
    fulfillmentText: string;
    responseMessages: Array<{
      text?: {
        text: string[];
      };
    }>;
  };
}

interface Message {
  sender: string; // To distinguish between user and bot messages
  avatarUrl: string;
  message: string;
  timestamp: string;
}

const ChatPanel = ({ prompts }: Props) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]); // Track all messages
  const [error, setError] = useState<string | undefined>("");

  console.log("Prompts --->", prompts);
  // Function to call Google Dialogflow API
  const sendPrompt = async (prompt: string) => {
    try {
      const accessToken =
        "ya29.a0AcM612ygp2GEro2eshCWfem4huAoDcCknnenoCFAe8E931FUuS3fHa6ENeFh0s-G98Jxo4mS25a4aizvL1Nd1gYhoP029Td_5a3oieieP_vS0vkfG8c7a1DDGBbdc9eWcAEiASi6LnG1IDzn5TWod89On_XfRAYgODsaCgYKAfsSARISFQHGX2MiV8YH9O6nW5ogM3buMgeEVw0170"; // Replace with your token
      const sessionId = "session111"; // Session ID (can be dynamically generated)
      const url = `https://europe-west1-dialogflow.googleapis.com/v3/projects/lcl-hackathon-e10-sbox-d6db/locations/europe-west1/agents/351b0001-a31c-4f2d-9116-697dfabf2267/environments/e42b062a-a8bf-49ff-9542-9196caff0bb3/sessions/${sessionId}:detectIntent`;

      const requestBody = {
        queryInput: {
          text: {
            text: prompt,
          },
          languageCode: "fr-fr",
        },
        queryParams: {
          timeZone: "Europe/Paris",
        },
      };
      const result = await axios.post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("LE RESULTAT ", result.data); // To verify the response structure

      return { data: result.data as DialogflowResponse };
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  useEffect(() => {
    const fetchPromptData = async () => {
      if (prompts) {
        // First, add the user's message to the chat history
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            sender: "User",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual user avatar if available
            message: prompts[0],
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        const result = await sendPrompt(prompts[0]);
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          // Add the bot's response to the chat history
          const botMessage = getResponseMessages(result.data);
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              sender: "Bot",
              avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with a bot avatar if needed
              message: botMessage,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      }
    };

    fetchPromptData();
  }, [prompts]);

  // Function to extract the messages from the response
  const getResponseMessages = (data: DialogflowResponse): string => {
    if (data && data.queryResult && data.queryResult.responseMessages) {
      const messages = data.queryResult.responseMessages
        .map((message) => {
          if (message.text && message.text.text) {
            return message.text.text[0]; // Extract the first string from the text array
          }
          return null;
        })
        .filter(Boolean); // Filter out null values

      return messages.join(" "); // Concatenate all messages into a single string
    }
    return ""; // Return an empty string if no response
  };

  return (
    <section className="border-2 border-red-700 h-[90%] p-10 flex flex-col gap-2 overflow-y-auto">
      {/* Map over chatHistory and display messages */}
      {chatHistory.map((msg, index) => (
        <InstagramMessage
          key={index}
          avatarUrl={msg.avatarUrl}
          senderName={msg.sender}
          message={msg.message}
          timestamp={msg.timestamp}
        />
      ))}

      {error && (
        <div className="mt-4 p-4 border border-red-500">
          Error: {JSON.stringify(error)}
        </div>
      )}
    </section>
  );
};

export default ChatPanel;
