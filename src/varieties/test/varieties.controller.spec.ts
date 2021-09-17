import { VarietiesController } from '../varieties.controller';
import { VarietiesService } from '../varieties.service';
import { Test } from '@nestjs/testing';

describe('Varieties controller', () => {
  let controller: VarietiesController;
  let service: VarietiesService;

  const varietiesMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VarietiesController],
      providers: [VarietiesService],
    })
      .overrideProvider(VarietiesService)
      .useValue(varietiesMockService)
      .compile();

    controller = moduleRef.get<VarietiesController>(VarietiesController);
    service = moduleRef.get<VarietiesService>(VarietiesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
