import { PasswordHash } from '@/application/services/password';
import bcrypt from 'bcrypt';

export class BcryptPasswordHash implements PasswordHash {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);

    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
