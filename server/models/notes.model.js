import mongoose from "mongoose";

// Schema of the user
const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    classLevel: String,
    examType: String,

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: Boolean,
    includeChart: Boolean,

    content: {
      type: mongoose.Schema.Types.Mixed, // Ai response (string/Json)
      required: true,
    },
  },
  { timestamps: true }
);

// Model of the user
const Notes = mongoose.model("Notes", notesSchema);

// export the Notes
export default Notes;
