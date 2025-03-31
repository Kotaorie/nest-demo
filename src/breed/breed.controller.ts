import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedResponseDto, CreateBreedDto } from './dtos';
import { CatResponseDto } from '@/cat/dtos/cat-response.dto';
import { CatService } from '@/cat/cat.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('breed')
export class BreedController {
  constructor(
    private breedService: BreedService,
    private catService: CatService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all breeds' })
  @ApiResponse({ status: 200, description: 'Returns all breeds' })
  findAll(): Promise<BreedResponseDto[]> {
    return this.breedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a breed by id' })
  @ApiResponse({ status: 200, description: 'Returns a breed' })
  findOne(@Param('id') id: string): Promise<BreedResponseDto> {
    return this.breedService.findOne(id);
  }

  @Get(':id/cats')
  @ApiOperation({ summary: 'Get all cats by breed id' })
  @ApiResponse({ status: 200, description: 'Returns all cats by breed id' })
  findCats(@Param('id') id: string): Promise<CatResponseDto[]> {
    return this.catService.findAll({ where: { breedId: id } });
  }

  @Post()
  @ApiOperation({ summary: 'Create a breed' })
  @ApiResponse({ status: 201, description: 'Returns the created breed' })
  create(@Body() breed: CreateBreedDto): Promise<BreedResponseDto> {
    return this.breedService.create(breed);
  }
}
