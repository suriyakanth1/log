// app.ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req: Request, res: Response) => {
  // Handle the incoming webhook payload here
  console.log('Received webhook payload:', req.body);

  // Perform any actions you need based on the webhook payload

  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
