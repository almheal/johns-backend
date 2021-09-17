import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { Test } from '@nestjs/testing';

describe('Categories controller', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(CategoriesService)
      .useValue(mockCategoriesService)
      .compile();

    controller = moduleRef.get<CategoriesController>(CategoriesController);
    service = moduleRef.get<CategoriesService>(CategoriesService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
