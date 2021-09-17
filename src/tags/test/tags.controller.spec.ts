import { TagsController } from '../tags.controller';
import { TagsService } from '../tags.service';
import { Test } from '@nestjs/testing';

describe('Tags controller', () => {
  let controller: TagsController;
  let service: TagsService;

  const tagsServiceMock = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [TagsService],
    })
      .overrideProvider(TagsService)
      .useValue(tagsServiceMock)
      .compile();

    controller = moduleRef.get<TagsController>(TagsController);
    service = moduleRef.get<TagsService>(TagsService);
  });

  test('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
