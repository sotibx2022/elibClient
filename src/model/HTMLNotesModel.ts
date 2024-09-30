import mongoose, { Document, Model } from 'mongoose';
// Define the interface for your HTML notes
export interface IHtmlNote extends Document {
    coverImage: string;
    url: string;
    title: string;
    description: string;
    author?: string;
    genre?: string;
}
// Define the schema for your HTML notes
const HtmlNoteSchema = new mongoose.Schema({
    coverImage: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});
// Use mongoose.models to check for the existing model or create a new one
export const HTMLNote: Model<IHtmlNote> = mongoose.models.HtmlNote || mongoose.model<IHtmlNote>('HtmlNote', HtmlNoteSchema);
