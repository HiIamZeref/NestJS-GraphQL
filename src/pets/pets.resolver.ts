import { Int, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Query, Args } from '@nestjs/graphql';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Mutation(() => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }
}
