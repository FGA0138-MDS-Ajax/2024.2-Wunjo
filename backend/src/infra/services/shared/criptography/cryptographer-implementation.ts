import { Cryptographer } from '@/application/services/cryptography';
import * as bcrypt from 'bcrypt';

export class CryptographerService implements Cryptographer {
  async compare(password_hash: string, password_input: string) {
    return await bcrypt.compare(password_hash, password_input);
  }
}
