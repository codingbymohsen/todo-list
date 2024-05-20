import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../models/user.model';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from '../create-user.command';
import { IUserRepository } from '../../../../user/infrastructure/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('IUserRepository')
    readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name } = command;
    const user = new User(name);
    return await this.userRepository.save(user);
  }
}
