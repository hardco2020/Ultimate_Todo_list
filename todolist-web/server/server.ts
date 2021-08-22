
import express, { Request, Response } from "express";
import next from "next";
import fs from 'fs';
import https from 'https';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const options = {
  key: fs.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost-key.pem'),
  cert: fs.readFileSync('/Users/kai/Documents/SideProject/Ultimate_Todo_list/todolist-server/localhost.pem'),
};
(async () => {
  try {
    await app.prepare();
    const server = express();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    https.createServer(options,server).listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();