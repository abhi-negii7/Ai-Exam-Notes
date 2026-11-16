const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

// Function to generate AI responses using the Gemini API
export const generateGeminiResponse = async (prompt) => {
  try {
    // Send a POST request to Gemini API with the user prompt
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    const text = data.candidates[0].content.parts[0].text;
    if (!text) {
      throw new Error("No text found in Gemini API response");
    }
    // Remove Markdown code block formatting from the response
    // This helps convert the generated text into valid JSON
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
};
