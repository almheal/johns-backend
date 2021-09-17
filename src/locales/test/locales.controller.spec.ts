import { LocalesService } from '../locales.service';
import { LocalesController } from '../locales.controller';
import { Test } from '@nestjs/testing';

describe('Locales controller', () => {
  let controller: LocalesController;
  let service: LocalesService;

  const localesMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LocalesController],
      providers: [LocalesService],
    })
      .overrideProvider(LocalesService)
      .useValue(localesMockService)
      .compile();

    controller = moduleRef.get<LocalesController>(LocalesController);
    service = moduleRef.get<LocalesService>(LocalesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
