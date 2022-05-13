import express from 'express';
import { router } from './router';

const app = express();
const port = process.env.PORT ?? 3000;

// log middleware
app.use((_, __, next) => {
  const timestamp = new Date().toISOString();

  // TODO: Create a logger
  console.log(`${timestamp} - Card <id> - <titulo> - <Remover|Alterar>`);

  next();
});

app.use(express.json());
app.use('/', router);

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
