import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { environment } from 'environments/environment'
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(environment.MONGO_URI),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthModule],
})
export class AppModule {}
