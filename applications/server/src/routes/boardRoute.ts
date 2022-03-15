import express from "express";
import { getRepository } from "typeorm";
import { Board } from "../models/Board";

const boardRoute = express.Router();
boardRoute.get("url here", (req, res) => {});

export { boardRoute };