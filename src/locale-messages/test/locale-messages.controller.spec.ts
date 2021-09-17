import { LocaleMessagesController } from '../locale-messages.controller';
import { LocaleMessagesService } from '../locale-messages.service';
import { Test } from '@nestjs/testing';

describe('Locale messages controller', () => {
  let controller: LocaleMessagesController;
  let service: LocaleMessagesService;

  const localeMessagesMockService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LocaleMessagesController],
      providers: [LocaleMessagesService],
    })
      .overrideProvider(LocaleMessagesService)
      .useValue(localeMessagesMockService)
      .compile();

    controller = moduleRef.get<LocaleMessagesController>(
      LocaleMessagesController,
    );
    service = moduleRef.get<LocaleMessagesService>(LocaleMessagesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
