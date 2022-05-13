import { CardRepository } from '../../ports/CardRepository';

export class DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(cardId: number): Promise<boolean | Error> {
    return await this.cardRepository.delete(cardId);
  }
}
