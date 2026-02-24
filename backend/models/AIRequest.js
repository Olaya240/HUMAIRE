import mongoose from 'mongoose';

const aiRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  moderated: { type: Boolean, default: true },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

const AIRequest = mongoose.model('AIRequest', aiRequestSchema);
export default AIRequest;
