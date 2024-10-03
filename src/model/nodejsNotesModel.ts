import mongoose, { Document, Model } from 'mongoose';
// Define the interface for your HTML notes
export interface InodejsNote extends Document {
    coverImage: string;
    url: string;
    title: string;
    description: string;
    author: string;
    genere: string;
    bgColor:string;
}
// Define the schema for your HTML notes
const nodejsNoteSchema = new mongoose.Schema({
    coverImage: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    bookTitle: {
        type: String,
        required: true,
    },
    bookDescription: {
        type: String,
        required: true,
        trim: true,
    },
    author:{
        type:String,
        required:true,
    },
    genere:{
        type:String,
        required:true,
    },
    bgColor:{
        type:String,
        required:true
    }
});
// Use mongoose.models to check for the existing model or create a new one
export const nodejsNote: Model<InodejsNote> = mongoose.models.nodejsNote || mongoose.model<InodejsNote>('nodejsNote', nodejsNoteSchema);
