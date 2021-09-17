import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { VarietiesModule } from './varieties/varieties.module';
import { NumberPersonsModule } from './number-persons/number-persons.module';
import { ImagesModule } from './images/images.module';
import { LocalesModule } from './locales/locales.module';
import { LocaleMessagesModule } from './locale-messages/locale-messages.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminUsersModule } from './admin-user/admin-users.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { FeaturesModule } from './features/features.module';
import { SizesModule } from './sizes/sizes.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    VarietiesModule,
    NumberPersonsModule,
    ImagesModule,
    LocalesModule,
    LocaleMessagesModule,
    AuthModule,
    UsersModule,
    AdminUsersModule,
    CategoriesModule,
    TagsModule,
    IngredientsModule,
    FeaturesModule,
    SizesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
