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
      "ya29.a0AcM612wMA8WOGVxcySPuwxkWpElBaVmTW1r04V036r57ZAZBqKMCl2-MbaL-IjJr3-V7lINMpJpkJFcj7CXhaTHro8BWDq6BXUPimtGP_xCGB5oPpFV5y0VYBQTjZXQ40UGB1GEws1sO-TooP-xbhNpUUGK3lpWt09YaCgYKAU4SARISFQHGX2MinTyqrhzEwnc7FU_w5mXqFg0170"; // Replace with your token
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
