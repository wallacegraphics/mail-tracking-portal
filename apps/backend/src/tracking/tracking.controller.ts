import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
// import { CreateTrackingDto } from './dto/create-tracking.dto';
// import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller('api/tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get(':id')
  getTrackingInfo(@Param('id') id: string) {
    return this.trackingService.getTrackingInfo(id);
  }
}
