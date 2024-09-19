import { Schema, model } from 'mongoose';

const LanguageSchema = new Schema({
  language: { type: String, required: true },
  translations: { type: Object, required: true },
});

export default model('Language', LanguageSchema);
