import { Users } from 'src/entity/users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}
