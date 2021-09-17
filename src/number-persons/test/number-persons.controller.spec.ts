import { NumberPersonsController } from '../number-persons.controller';
import { NumberPersonsService } from '../number-persons.service';
import { Test } from '@nestjs/testing';

describe('Number persons controller', () => {
  let controller: NumberPersonsController;
  let service: NumberPersonsService;

  const numberPersonsMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [NumberPersonsController],
      providers: [NumberPersonsService],
    })
      .overrideProvider(NumberPersonsService)
      .useValue(numberPersonsMockService)
      .compile();

    controller = moduleRef.get<NumberPersonsController>(
      NumberPersonsController,
    );
    service = moduleRef.get<NumberPersonsService>(NumberPersonsService);
  });

  test('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
