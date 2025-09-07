import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConcertsService } from './concerts.service';
import { Concerts } from './schema/concerts.schema';

const mockConcert = {
  name: 'Test Concert',
  totalOfSeat: 100,
  description: 'Test Desc',
};

const mockConcertModel = {
  create: jest.fn().mockResolvedValue(mockConcert),
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockConcert]) }),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockConcert),
};

describe('ConcertsService', () => {
  let service: ConcertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertsService,
        {
          provide: getModelToken(Concerts.name),
          useValue: mockConcertModel,
        },
      ],
    }).compile();

    service = module.get<ConcertsService>(ConcertsService);
  });

  it('should create a concert', async () => {
    expect(await service.create(mockConcert)).toEqual(mockConcert);
  });

  it('should return all concerts', async () => {
    expect(await service.findAll()).toEqual([mockConcert]);
  });

  it('should delete a concert', async () => {
    await expect(service.remove('anyid')).resolves.toBeUndefined();
  });
});
