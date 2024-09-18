import Server from "./models/server";
import express, { Request, Response } from 'express';
import session from 'express-session';

const server = new Server();
server.listen();
const app = express();

app.use(session({
  secret: 'mi_secreto_super_seguro',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },  // Usa secure: true solo si estás usando HTTPS
}));