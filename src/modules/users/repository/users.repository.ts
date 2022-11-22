import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserDao } from './dao/user.dao';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/common/entities/user';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserDao)
    private readonly usersRepository: Repository<UserDao>,
  ) {}

  insertAndFetch(payload: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(payload);

    return this.usersRepository.save(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({
      email,
    });
  }
}
