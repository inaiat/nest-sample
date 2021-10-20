import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './user.domain';

const mockUser = {
  name: 'Elizeu Drummond',
  email: 'elizeu.drummond@telerj.com',
  phoneNumber: "+5521993852887",
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  const userArray = [
    {
      name: 'Elizeu Drummond',
      email: 'elizeu.drummond@telerj.com',
      phoneNumber: "+5521993852887",
    },
    {
      name: 'Luiz Pareto',
      email: 'luiz.pareto@telerj.com',
      phoneNumber: "+5521993852887",
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('data class is immutable', () =>{
     expect(() => {
      const user = User.create({name: "usuario", email: "bla", phoneNumber: "1234"})
      user.email = "malandrao"
     }).toThrowError("read only")
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(userArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(userArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve(mockUser),
    );
    const newCat = await service.create(User.create({
      name: 'Cat #1',
      email: 'Breed #1',
      phoneNumber: "+5521993852887"
    }));
    expect(newCat).toEqual(mockUser);
  });
});