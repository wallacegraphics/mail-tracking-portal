import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TrackingService } from './tracking/tracking.service'
import { TrackingModule } from './tracking/tracking.module'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [HttpModule, TrackingModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
