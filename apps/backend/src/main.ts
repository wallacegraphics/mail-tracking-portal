import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('BOOTSTRAP')
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4000', // Replace with your frontend URL if necessary
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  const port = process.env.PORT || 4001
  logger.log(`Application listening on port ${port}`)
  await app.listen(port)
}
bootstrap()
