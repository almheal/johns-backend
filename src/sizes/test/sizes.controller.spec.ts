import { SizesController } from '../sizes.controller';
import { SizesService } from '../sizes.service';
import { Test } from '@nestjs/testing';

describe('Sizes controller', () => {
  let controller: SizesController;
  let service: SizesService;

  const sizesMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SizesController],
      providers: [SizesService],
    })
      .overrideProvider(SizesService)
      .useValue(sizesMockService)
      .compile();

    controller = moduleRef.get<SizesController>(SizesController);
    service = moduleRef.get<SizesService>(SizesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
