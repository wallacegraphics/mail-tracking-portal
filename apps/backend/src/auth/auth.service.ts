import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async authenticate() {
    const controller = new AbortController()
    const timerId = setTimeout(() => controller.abort(), 5000)

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Cookie', 'TLTSID=a967462fd8591663800800e0ed96a2ca; NSC_tfswjdft-mc=ffffffff3b223ef445525d5f4f58455e445a4a42378b')

    const raw = JSON.stringify({
      username: 'atlantamailing',
      password: 'W@llaceG01',
      grant_type: 'authorization',
      response_type: 'token',
      scope: 'user.info.ereg,iv1.apis',
      client_id: '687b8a36-db61-42f7-83f7-11c79bf7785e',
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      signal: controller.signal,
      redirect: 'follow' as RequestRedirect,
    }

    try {
      const response = await fetch('https://services.usps.com/oauth/authenticate', requestOptions)
      const result = await response.text()
      console.log(result)
      return result
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      clearTimeout(timerId)
    }
  }
}
