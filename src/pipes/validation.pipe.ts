import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return this.removeEmptyElements(value);
    }

    const updatedValue = this.removeEmptyElements(value);
    const object = plainToClass(metatype, updatedValue);
    const errors = await validate(object, updatedValue);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return updatedValue;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private removeEmptyElements(obj) {
    if (typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) =>
        obj.splice(index, 1, this.removeEmptyElements(item)),
      );
      return obj;
    }

    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, value]) => {
          if (Array.isArray(value) && value.length !== 0) {
            return value;
          }
          if (value !== null && value !== '' && value !== undefined) {
            return typeof value === 'boolean' ? true : value;
          }
        })
        .map(([key, value]) => [
          key,
          value === Object(value) ? this.removeEmptyElements(value) : value,
        ]),
    );
  }
}
