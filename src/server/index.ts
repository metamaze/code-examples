import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const startServer = () => {
  const app: Express = express();

  app.use(bodyParser.json({ limit: '2000mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  /**
   * Metamaze will send data to this endpoint if your configured this correctly in the project settings.
   */
  app.post('/metamaze-output', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2));
    return res.send('OK');
  });

  const httpServer = http.createServer(app);
  const port = 4000;
  httpServer.listen(port, async () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
};

startServer();
