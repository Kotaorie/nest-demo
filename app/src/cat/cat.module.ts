import { Module, forwardRef } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CommentaryEntity } from '@/commentary/commentary.entity';
import { BreedEntity } from '@/breed/breed.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BreedModule } from '@/breed/breed.module';
import { redisConfig } from '@/config';
@Module({
  controllers: [CatController],
  providers: [CatService],
  imports: [
    TypeOrmModule.forFeature([CatEntity, BreedEntity, CommentaryEntity]),
    ClientsModule.register([
      {
        name: 'COLORS_SERVICE',
        transport: Transport.REDIS,
        options: redisConfig,
      },
    ]),
    forwardRef(() => BreedModule),
  ],
  exports: [CatService],
})
export class CatModule {}
