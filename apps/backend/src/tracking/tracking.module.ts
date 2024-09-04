import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TrackingController } from './tracking.controller'
import { TrackingService } from './tracking.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule, HttpModule],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
