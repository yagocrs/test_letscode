import { Card } from '../../domain/entity/Card';
import { Router, Request, Response } from 'express';

import { CardController } from './cardController';
import { AuthController } from './authController';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const authController = new AuthController();
  const { login, senha } = req.body;

  authController
    .authenticate(login, senha)
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ error: false, message: 'Invalid email or password' });
        return;
      }

      res.send(user);
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err.message
      });
    });
});

router.get('/cards', (_: Request, res: Response) => {
  const cardController = new CardController();

  const onSucces = (cards: Card[]): void => {
    cards.length
      ? res.send(cards)
      : res.send({ error: false, message: 'No cards found' });
  };

  const onError = (err: Error): void => {
    res.json({
      error: true,
      message: err.message
    });
  };

  cardController.getAll().then(onSucces).catch(onError);
});

router.post('/cards', (req: Request, res: Response) => {
  if (!req.body.titulo || !req.body.conteudo || !req.body.lista) {
    res.status(400).send({ error: false, message: 'Missing required fields' });
  }

  const cardController = new CardController();

  const onSucces = (card: Card): any => {
    res.json(card);
  };

  const onError = (err: Error): void => {
    res.status(500).json({ error: true, message: err.message });
  };

  cardController.create(req.body).then(onSucces).catch(onError);
});

router.put('/cards/:id', (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).send({ error: false, message: 'Missing card id' });
  }

  if (!req.body.titulo || !req.body.conteudo || !req.body.lista) {
    res.status(400).send({ error: false, message: 'Missing required fields' });
  }

  const cardController = new CardController();
  const cardId: number = Number(req.params.id);
  const card: Card = req.body;

  const onSucces = (result: any): any => {
    result === true
      ? res.json({ message: `Card with id ${cardId} was updated` })
      : res.status(404).send({ error: false, message: 'Card not found' });
  };

  const onError = (err: Error): void => {
    res.status(500).json({ error: true, message: err.message });
  };

  cardController.update(cardId, card).then(onSucces).catch(onError);
});

router.delete('/cards/:id', (req: Request, res: Response) => {
  const cardController = new CardController();
  const cardId: number = Number(req.params.id);

  // prettier-ignore
  const onSucces = (result: any): any => {
    result === true
      ? res.json({
        error: false,
        message: `Card with id ${cardId} was deleted`
      })
      : res.status(404).send({ error: false, message: 'Card not found' });
  };

  const onError = (err: Error): void => {
    res.status(500).json({ error: true, message: err.message });
  };

  cardController.delete(cardId).then(onSucces).catch(onError);
});

export { router };
