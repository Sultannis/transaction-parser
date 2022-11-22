import { Injectable } from "@nestjs/common";
import { User } from "src/common/entities/user";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UsersRepository } from "../repository/users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    
    
    return this.usersRepository.insertAndFetch(payload)
  }
}