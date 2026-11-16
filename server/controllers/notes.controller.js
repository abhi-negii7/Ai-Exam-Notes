import Notes from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res
      .status(500)
      .json({ message: `getCurrentUser notes error ${error}` });
  }
};

export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({ _id: req.params.id, user: req.userId });
    if (!notes) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching single note:", error);
    return res.status(500).json({ message: `getSingleNotes error ${error}` });
  }
};
