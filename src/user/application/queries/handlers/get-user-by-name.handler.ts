import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserByNameQuery } from '../get-user-by-name.query';
import { MongoUserRepository } from '../../../infrastructure/repositories/mongo-user.repository';
import { User } from '../../../models/user.model';

@QueryHandler(GetUserByNameQuery)
export class GetUserByNameHandler implements IQueryHandler<GetUserByNameQuery> {
  constructor(
    @Inject('IUserRepository') readonly userRepository: MongoUserRepository,
  ) {}
  execute(query: GetUserByNameQuery): Promise<User> {
    return this.userRepository.findByName(query.name);
  }
}
