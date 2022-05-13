import { Card } from '../../entity/Card';
import { CardRepository } from '../../ports/CardRepository';

export class CreateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(card: Card): Promise<Card> {
    return await this.cardRepository.create(card);
  }
}
