import { IngredientsController } from '../ingredients.controller';
import { IngredientsService } from '../ingredients.service';
import { Test } from '@nestjs/testing';

describe('Ingredients controller', () => {
  let controller: IngredientsController;
  let service: IngredientsService;

  const ingredientsMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [IngredientsService],
    })
      .overrideProvider(IngredientsService)
      .useValue(ingredientsMockService)
      .compile();

    controller = moduleRef.get<IngredientsController>(IngredientsController);
    service = moduleRef.get<IngredientsService>(IngredientsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
