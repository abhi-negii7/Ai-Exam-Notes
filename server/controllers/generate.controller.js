import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      level,
      examType,
      revisionMode = false,
      diagrams: includeDiagram = false,
      charts: includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "user is not found" });
    }
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      return res.status(400).json({ message: "Insufficient credits" });
    }
    const prompt = buildPrompt({
      topic,
      level,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });
    const aiResponse = await generateGeminiResponse(prompt);

    // save the notes to the database
    const notes = await Notes.create({
      user: user._id,
      topic,
      level,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    // deduct 10 credits from the user
    user.credits -= 10;
    if (user.credits <= 0) {
      user.isCreditAvailable = false;
    }
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }
    await user.save();

    return res
      .status(200)
      .json({ data: aiResponse, noteId: notes._id, creditsLeft: user.credits });
  } catch (error) {
    console.error("Error generating notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
