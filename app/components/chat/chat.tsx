import React, { useEffect, useState, useRef } from "react";
import InstagramMessage from "../InstagramMessage";
import axios from "axios";
import { delay, motion } from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";

const PanelChat = ({ prompts }: { prompts: string[] }) => {
  const [error, setError] = useState<string | undefined>("");
  const [botResponses, setBotResponses] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Référence pour l'élément contenant les messages

  const sendPrompt = async (prompt: string) => {
    try {
      const accessToken =
        "ya29.a0AcM612xFu-kK-LFV6KyBoxhaDYBhEkTb-b-kwPjh-L6QC5zMCnpH2twzN7d84zq-oPog6ilnV4N51x_tNfe3c8h3xTCNnA_VK3qRDujsofkZCzKVpAR-50_8b0HGjkBarkQ6XsERoPwLpigNdwfF1jXvDHOpyPcjbmAaCgYKAVYSARISFQHGX2MiP9TK7hWkw8i8Wjr2bUvt8Q0170"; // Remplace par ton token
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

      const botResponse =
        result.data.queryResult.responseMessages[0].text.text[0];
      return { data: botResponse };
    } catch (err) {
      return { error: (err as Error).message };
    }
  };

  useEffect(() => {
    const fetchBotResponses = async () => {
      try {
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

    fetchBotResponses(); // Récupère les réponses du bot quand les prompts changent
  }, [prompts]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Masque le spinner après le délai
    }, 2000);

    return () => clearTimeout(timer);
  }, [prompts]);

  // Effet pour scroller automatiquement vers le bas à chaque mise à jour des réponses
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight; // Scrolle automatiquement en bas
    }
  }, [botResponses, prompts]); // Déclenche l'effet à chaque changement des réponses ou des prompts

  return (
    <section
      ref={containerRef}
      className="relative border-2 rounded-xl bg-gray-100 h-[90%] p-10 flex flex-col gap-2 overflow-y-auto"
      style={{
        backgroundImage: `url('/lion(1).png')`,
        backgroundSize: "100px",
        opacity: 1,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-2 right-2 w-44 flex flex-row gap-1">
        <p className="">Sponsored by Google</p>
        <Image src={"/google.png"} height={10} width={30} alt="" />
      </div>
      {prompts.map((prompt, index) => (
        <div key={index} className="flex flex-col">
          {/* Message de l'utilisateur */}
          <div
            className={`w-full flex justify-end ${
              prompt === "Hey" ? "hidden" : ""
            }`}
          >
            <InstagramMessage
              avatarUrl={"https://randomuser.me/api/portraits/women/44.jpg"}
              senderName={"Moi"}
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
                senderName={"Jean-Charles"}
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

const PanelPrompt = ({
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
    <motion.section
      className="bg-transparent  rounded-xl h-[10%] w-full p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center space-x-3 w-full justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.input
          type="text"
          className="w-[25%] border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out shadow-sm placeholder-gray-500 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tapez votre message ici..."
          initial={{ opacity: 0, z: 0 }}
          animate={{ opacity: 1, z: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Icône d'envoi */}
        <motion.button
          type="submit"
          className="text-blue-500 hover:text-blue-600 transition duration-200 ease-in-out"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowBigRight color="white" size={24} />
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

// PanelHistory component
const PanelHistory = ({ prompts }: { prompts: string[] }) => {
  return (
    <section className="h-full bg-white p-4 rounded-3xl flex flex-col justify-between overflow-scroll">
      <div>
        <h2 className="text-lg font-bold mb-4 text-center">
          Historique des discussions
        </h2>
        <span className="space-y-4">
          {prompts.map((prompt) => (
            <div key={prompt} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-md font-medium">
                {prompt === "Hey" ? "" : prompt}
              </h3>
            </div>
          ))}
        </span>
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
    <motion.section
      className="gap-5 h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#406be9] to-[#6363f7] flex flex-row w-full p-5"
      initial={{ opacity: 0, z: 0 }} // Point de départ invisible
      animate={{ opacity: 1, z: 1 }} // Animation vers l'état visible
      transition={{ duration: 1.2 }} // Durée de la transition pour l'apparition de la section
    >
      {/* Animation pour le PanelHistory */}
      <motion.div
        className="w-[20%]"
        initial={{ x: -100, opacity: 0 }} // Départ depuis la gauche
        animate={{ x: 0, opacity: 1 }} // Glissement vers la position finale
        transition={{ duration: 1, ease: "easeInOut" }} // Animation douce
      >
        <PanelHistory prompts={prompts} />
      </motion.div>

      {/* Animation pour le PanelChat et PanelPrompt */}
      <motion.div
        className="w-[80%] flex flex-col gap-3"
        initial={{ opacity: 0, y: 50 }} // Départ en bas avec opacité 0
        animate={{ opacity: 1, y: 0 }} // Apparition et remontée vers la position finale
        transition={{ duration: 1.2, ease: "easeOut" }} // Durée et douceur de l'animation
      >
        <PanelChat prompts={prompts} />
        <PanelPrompt
          currentPrompt={currentPrompt}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      </motion.div>
    </motion.section>
  );
};

export default Chat;
