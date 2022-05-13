import { Card } from '../../entity/Card';
import { CardRepository } from '../../ports/CardRepository';

export class GetAllCardsUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(): Promise<Card[]> {
    return await this.cardRepository.getAll();
  }
}
