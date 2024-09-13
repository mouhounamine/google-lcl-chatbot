const clientId =
  "832249341370-uuigo56soe3eq3k0lka0sc03f3r0lhto.apps.googleusercontent.com";
const clientSecret = "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";

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Erreur lors de l'obtention du token");
    }

    const data = (await response.json()) as { access_token: string }; // Ici, on dit à TypeScript que "data" contient un "access_token"
    return data.access_token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token:", error);
    return null;
  }
};
