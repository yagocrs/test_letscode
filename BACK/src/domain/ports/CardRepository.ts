import { Card } from '../entity/Card';

export interface CardRepository {
  create: (card: Card) => Promise<Card>;
  update: (cardId: number, card: Card) => Promise<boolean | Error>;
  delete: (cardId: number) => Promise<boolean | Error>;
  getAll: () => Promise<Card[]>;
  getById: (cardId: number) => Promise<Card>;
}
