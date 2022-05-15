const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const modelTodo = require("../models/todo");

const list = async (req, res) => {
  const todoList = await modelTodo.findAll().exec();
  return res.json(todoList);
};

exports.list = list;
