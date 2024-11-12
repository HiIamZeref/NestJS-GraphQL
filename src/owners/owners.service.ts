import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
  ) {}

  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);

    return this.ownersRepository.save(newOwner);
  }

  findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const owner = await this.ownersRepository.findOneOrFail({ where: { id } });

    Object.assign(owner, updateOwnerInput);

    return this.ownersRepository.save(owner);
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.ownersRepository.findOneOrFail({ where: { id } });
    return this.ownersRepository.remove(owner);
  }
}
