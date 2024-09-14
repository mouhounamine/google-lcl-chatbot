import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import InstagramMessage from "../InstagramMessage";
import axios from "axios";
import { motion } from "framer-motion";

const PanelChat = ({ prompts }: { prompts: string[] }) => {
  const [error, setError] = useState<string | undefined>("");
  const [botResponses, setBotResponses] = useState<string[]>([]);

  const sendPrompt = async (prompt: string) => {
    try {
      const accessToken =
        "ya29.a0AcM612xB4L-E195DQGEH7n5qtAeF_xv0CVaDWydXcpHe_be4dk1k172dRSXFbqOgPvIIwBm2ModGnfyB5XOa2xvfe3Q695MgFBJvzh0xghei38BeLmqEg8nOfmM10V_mNWUVw6fl1qNgj0lSxr3OriH4nvpuFeeeeCEaCgYKAV4SARISFQHGX2MiStzYyeeYXOGurXNCjMtczA0170"; // Remplace par ton token
      const sessionId = "session111"; // ID de session (peut être généré dynamiquement)
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

      // Récupère le texte de la réponse du bot
      const botResponse =
        result.data.queryResult.responseMessages[0].text.text[0];
      return { data: botResponse };
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  // Fonction pour envoyer chaque prompt à Dialogflow et stocker les réponses du bot
  useEffect(() => {
    const fetchBotResponses = async () => {
      try {
        // Initialise un tableau pour stocker les réponses
        const responses = await Promise.all(
          prompts.map(async (prompt) => {
            const result = await sendPrompt(prompt);
            if (result.data) {
              return result.data; // Utilise la réponse du bot
            } else if (result.error) {
              setError(result.error);
              return "Erreur dans la réponse du bot.";
            }
          })
        );

        setBotResponses(responses); // Stocke toutes les réponses dans l'état
      } catch (err) {
        setError((err as Error).message);
      }
    };

    console.log("botResponses", botResponses);

    fetchBotResponses(); // Récupère les réponses du bot quand les prompts changent
  }, [prompts]); // Relance l'effet quand les prompts changent

  const [loading, setLoading] = useState(true); // État pour le spinner

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Masque le spinner après le délai
    }, 2000); // 2 secondes de délai (correspondant au delay de l'animation)

    return () => clearTimeout(timer); // Nettoie le timer lorsque le composant est démonté
  }, [prompts]); // Recrée le délai quand les prompts changent

  return (
    <section className="border-2 rounded-xl bg-white h-[90%] p-10 flex flex-col gap-2 overflow-y-auto">
      {/* Parcourt les prompts et affiche les messages utilisateur et bot */}
      {prompts.map((prompt, index) => (
        <div key={index} className="flex flex-col">
          {/* Message de l'utilisateur */}
          <div
            className={`w-full flex justify-end ${
              prompt === "Hello" ? "hidden" : ""
            }`}
          >
            <InstagramMessage
              avatarUrl={"https://randomuser.me/api/portraits/women/44.jpg"}
              senderName={"User"}
              message={prompt}
              timestamp={new Date().toLocaleTimeString()}
            />
          </div>

          {/* Spinner de "loading" */}
          {loading ? (
            <div className="w-full flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-blue-500"></div>
                <span className="text-gray-500">Bot is typing...</span>
              </div>
            </div>
          ) : (
            // Message du bot après le délai
            <motion.div
              className="w-full flex justify-start"
              initial={{ opacity: 0, y: 20 }} // Commence invisible et légèrement en dessous
              animate={{ opacity: 1, y: 0 }} // Devient visible et remonte à sa position initiale
              transition={{ duration: 0.5 }} // Animation du message du bot
            >
              <InstagramMessage
                avatarUrl={"https://randomuser.me/api/portraits/men/44.jpg"}
                senderName={"Bot"}
                message={botResponses[index]}
                timestamp={new Date().toLocaleTimeString()}
              />
            </motion.div>
          )}
        </div>
      ))}

      {/* Affiche une erreur si présente */}
      {error && (
        <div className="mt-4 p-4 border border-red-500">
          Error: {JSON.stringify(error)}
        </div>
      )}
    </section>
  );
};

// PanelPrompt component
const PanelPrompt = ({
  currentPrompt,
  inputValue,
  setInputValue,
  handleSubmit,
}: {
  currentPrompt: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: any) => void;
}) => {
  return (
    <section className=" bg-white rounded-xl h-[10%] grid place-content-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-blue-600"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
          Submit
        </button>
      </form>
    </section>
  );
};

// PanelHistory component
const PanelHistory = ({ prompts }: { prompts: string[] }) => {
  return (
    <section className="h-full bg-white p-4 rounded-3xl flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4 text-center">
          Historique des discussions
        </h2>
        <span className="space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-md font-medium">{prompt}</h3>
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

// Main Chat component
const Chat = () => {
  const [currentPrompt, setCurrentPrompt] = useState("Hey");
  const [prompts, setPrompts] = useState([currentPrompt]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("Prompt à exécuter : " + currentPrompt);
  }, [currentPrompt]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setCurrentPrompt(inputValue);
      setPrompts([...prompts, inputValue]);
      setInputValue("");
    }
  };

  return (
    <section className="gap-5 h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#406be9] to-[#6363f7] flex flex-row w-full p-5">
      <div className=" w-[20%]">
        <PanelHistory prompts={prompts} />
      </div>
      <div className=" w-[80%] flex flex-col gap-3">
        <PanelChat prompts={prompts} />
        <PanelPrompt
          currentPrompt={currentPrompt}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default Chat;
