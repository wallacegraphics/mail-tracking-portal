import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingService } from './tracking/tracking.service';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [TrackingModule],
  controllers: [AppController],
  providers: [AppService, TrackingService],
})
export class AppModule {}
