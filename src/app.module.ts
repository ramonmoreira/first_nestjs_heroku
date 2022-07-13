import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://manomoreira:benga1@cluster0.ouafxtt.mongodb.net/test'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
