const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaTodo = new Schema();
schemaTodo.set("collection", "Todo");

schemaTodo.add({
  id: mongoose.Schema.ObjectId,
  title: { type: String, required: true, dropDups: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "CoreUser", required: true },
});

module.exports = mongoose.model("Todo", schemaTodo);
