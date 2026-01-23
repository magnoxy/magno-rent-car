import { hashSync } from 'bcrypt';
import { ValueTransformer } from 'typeorm';

export const hashPasswordTransform: ValueTransformer = {
  to(value: string) {
    if (value) {
      return hashSync(value, 10);
    }
    return value;
  },
  from(value: string) {
    return value;
  },
};
