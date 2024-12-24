import { CustomError } from '@/application/error';
import { StudentTokenManager, StudentTokenManagerGenerateInput } from '@/application/services/token/token-manager-service';
import { env } from '@/env';
import jwt from 'jsonwebtoken';

export class JWTStudentTokenManager implements StudentTokenManager {
  SECRET_KEY: string = env.JWT_SECRET_KEY;

  async generate(data: StudentTokenManagerGenerateInput): Promise<string> {
    try {
      const studentId = data.studentId;
      const token: string = jwt.sign({ _id: studentId }, this.SECRET_KEY, {
        expiresIn: env.JWT_TOKEN_EXPIRATION,
        algorithm: 'HS256',
      });
      return token;
    // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      throw new CustomError('Error generating token', 'JWT token error', 401);
    }
  }

  async verify(token: string): Promise<boolean> {
    if (!token) {
      throw new CustomError('Invalid input token', 'JWT token error', 401);
    }
    const decoded = jwt.verify(token, this.SECRET_KEY);
    if (!decoded) {
      return false;
    }
    return true;
  }

  async decrypt(token: string): Promise<object> {
    return new Object(jwt.decode(token));
  }
}
