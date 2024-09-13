import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  prompt: string;
}

const ChatPanel = ({ prompt }: Props) => {
  const [response, setResponse] = useState<any>(null); // Remplacement par any pour traiter l'objet de réponse complet
  const [error, setError] = useState<string | undefined>("");

  // Fonction pour appeler l'API Google Dialogflow
  const sendPrompt = async (prompt: string) => {
    try {
      const accessToken =
        "ya29.a0AcM612xmSuAPoN4SB9a038JLCplulL5mVgLiWnNhsxV4rV3Y9qVBbnMNgG-Uv1EW_oWVZUOR5WuWyA04umWoc1VAhi-kcV5BUMthd23jRXf3LnaEurJ1ha_5JhBoFS-Aoq1RlVhGZVLmi_0PicvXh2hsltAGQRY0oQaCgYKAWwSARISFQHGX2MiluiMz1fDjFp3ykJfhdRE1w0169"; // Remplace par ton token
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

      console.log("LE RESULTAT ", result.data); // Pour vérifier la structure de la réponse

      return { data: result.data };
    } catch (err) {
      return { error: err.message };
    }
  };

  useEffect(() => {
    const fetchPromptData = async () => {
      if (prompt) {
        const result = await sendPrompt(prompt);
        if (result.error) {
          setError(result.error);
        } else {
          setResponse(result.data); // Enregistre la réponse entière
        }
      }
    };

    fetchPromptData();
  }, [prompt]);

  // Fonction pour extraire les messages de responseMessages
  const getResponseMessages = () => {
    if (
      response &&
      response.queryResult &&
      response.queryResult.responseMessages
    ) {
      const messages = response.queryResult.responseMessages.map(
        (message: any, index: number) => {
          if (message.text && message.text.text) {
            return <p key={index}>{message.text.text[0]}</p>; // Assure-toi que text est un tableau
          }
          return null;
        }
      );
      return messages;
    }
    return null;
  };

  return (
    <section className="border-2 border-red-700 h-[90%] p-10 flex flex-col gap-2">
      <div className="border-2 border-green-500 h-[50%] w-full flex flex-row items-center gap-5">
        <div className="border-2 border-black w-[30%] h-[80%]"></div>
        <div className="border-2 border-red-600 w-[30%] h-[80%]"></div>
        <div className="border-2 border-red-600 w-[30%] h-[80%]"></div>
        <div className="border-2 border-red-600 w-[30%] h-[80%]"></div>
      </div>
      {prompt === "a" && (
        <div className="border-2 border-red-500 h-[50%] w-full grid place-content-center text-center">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s...
          </p>
        </div>
      )}

      {response && (
        <div className="mt-4 p-4 border border-blue-500">
          <h1>{JSON.stringify(response)}</h1>
          <p>Response ID: {response.responseId}</p>
          <p>Query Result: {response.queryResult.fulfillmentText}</p>
          <div>{getResponseMessages()}</div> {/* Affichage des messages */}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 border border-red-500">Error: {error}</div>
      )}
    </section>
  );
};

export default ChatPanel;
