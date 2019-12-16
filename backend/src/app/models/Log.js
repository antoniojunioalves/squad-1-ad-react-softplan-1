import mongoose from 'mongoose';

const { Schema } = mongoose;

const LogSchema = new Schema({
  level: String,
  environment: String,
  origin: String,
  description: {
    title: String,
    stacktrace: String,
  },
  occurrences: Number,
  lastOccurrence: {
    date: Date,
    user: String,
  },
  token: String,
  removed: Boolean,
  archived: Boolean,
});

module.exports = mongoose.model('Log', LogSchema);
