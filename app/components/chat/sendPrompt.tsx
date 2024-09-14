import axios from "axios";

interface Message {
  sender: string; // To distinguish between user and bot messages
  avatarUrl: string;
  message: string;
  timestamp: string;
}

export const sendPrompt = async (prompt: Message) => {
  try {
    const accessToken =
      "ya29.a0AcM612xB4L-E195DQGEH7n5qtAeF_xv0CVaDWydXcpHe_be4dk1k172dRSXFbqOgPvIIwBm2ModGnfyB5XOa2xvfe3Q695MgFBJvzh0xghei38BeLmqEg8nOfmM10V_mNWUVw6fl1qNgj0lSxr3OriH4nvpuFeeeeCEaCgYKAV4SARISFQHGX2MiStzYyeeYXOGurXNCjMtczA0170"; // Replace with your token
    const sessionId = "session111"; // Session ID (can be dynamically generated)
    const url = `https://europe-west1-dialogflow.googleapis.com/v3/projects/lcl-hackathon-e10-sbox-d6db/locations/europe-west1/agents/351b0001-a31c-4f2d-9116-697dfabf2267/environments/e42b062a-a8bf-49ff-9542-9196caff0bb3/sessions/${sessionId}:detectIntent`;

    const requestBody = {
      queryInput: {
        text: {
          text: prompt.message,
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

    return { data: result.data };
  } catch (err) {
    return { error: (err as Error).message };
  }
};
