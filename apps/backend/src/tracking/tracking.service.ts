import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
// import { CreateTrackingDto } from './dto/create-tracking.dto';
// import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { AuthService } from 'src/auth/auth.service'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class TrackingService {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  async getTrackingInfo(id: string) {
    const authResponse = await this.authService.authenticate()
    const token = JSON.parse(authResponse).access_token
    let response

    try {
      response = await firstValueFrom(
        this.httpService.get(
          `https://iv.usps.com/ivws_api/informedvisapi/api/mt/get/piece/imb/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      )

      console.log('Request Successful')
    } catch (error) {
      console.error(error)
    }

    return {
      shippingAddress: {
        name: 'Branch Manager',
        address1: 'WELLS FARGO - 102025 - RET',
        address2: '',
        city: 'Hackensack',
        state: 'NJ',
        zipCode: '07601',
      },
      imbNumber: id,
      fullHistory: response.data,
    }
  }
}
