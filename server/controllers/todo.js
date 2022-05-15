// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const modelTodo = require("../models/todo");

const list = async (req, res) => {
  const todoList = await modelTodo.find().exec();
  return res.json(todoList);
};

const create = async (req, res) => {

  try {
    // const { title } = req.body;
    const title = "todo test"
    const todo = new modelTodo({
      title,
      owner: req.user.userId,
    });

    await todo.save();

    res.status(201).json({ todo });
  } catch (e) {
    res.status(500).json({ message: "Todo not created with error: " + e });
    console.error("Todo not created with error:", e);
  }

  return res.json(succes);
};

exports.list = list;
exports.create = create;
