import { Card } from 'domain/entity/Card';
import { CardRepository } from '../../ports/CardRepository';

export class UpdateCardeCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(cardId: number, card: Card): Promise<boolean | Error> {
    return await this.cardRepository.update(cardId, card);
  }
}
