import { FeaturesController } from '../features.controller';
import { FeaturesService } from '../features.service';
import { Test } from '@nestjs/testing';

describe('Features controller', () => {
  let controller: FeaturesController;
  let service: FeaturesService;

  const featuresMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [FeaturesService],
    })
      .overrideProvider(FeaturesService)
      .useValue(featuresMockService)
      .compile();

    controller = moduleRef.get<FeaturesController>(FeaturesController);
    service = moduleRef.get<FeaturesService>(FeaturesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
