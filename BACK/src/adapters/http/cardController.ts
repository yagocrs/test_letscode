import { Card } from 'domain/entity/Card';
import {
  CreateCardUseCase,
  DeleteCardUseCase,
  GetAllCardsUseCase,
  UpdateCardeCase
} from '../../domain/useCase/Cards';

import { SqliteCardRepository as DatabaseImplementation } from '../../infrastructure/sqlite/sqliteImplementation';

export class CardController {
  async getAll(): Promise<Card[]> {
    const getAllCardsUseCase = new GetAllCardsUseCase(
      new DatabaseImplementation()
    );
    const cards = await getAllCardsUseCase.execute();
    return cards;
  }

  async create(card: Card): Promise<Card> {
    const createCardUseCase = new CreateCardUseCase(
      new DatabaseImplementation()
    );
    const createdCard = await createCardUseCase.execute(card);
    return createdCard;
  }

  async update(cardId: number, card: Card): Promise<boolean | Error> {
    const updateCardUseCase = new UpdateCardeCase(new DatabaseImplementation());
    return await updateCardUseCase.execute(cardId, card);
  }

  async delete(cardId: number): Promise<boolean | Error> {
    const deleteCardUseCase = new DeleteCardUseCase(
      new DatabaseImplementation()
    );
    return await deleteCardUseCase.execute(cardId);
  }
}
