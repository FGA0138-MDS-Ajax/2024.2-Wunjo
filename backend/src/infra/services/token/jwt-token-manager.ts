import { CustomError } from '@/application/error';
import { StudentTokenManager, StudentTokenManagerGenerateInput } from '@/application/services';
import { env } from '@/env';
import jwt from 'jsonwebtoken';

export class JWTStudentTokenManager implements StudentTokenManager {
  async generate(data: StudentTokenManagerGenerateInput): Promise<string> {
    try {
      const studentId = data.studentId;
      const token: string = jwt.sign({ student_id: studentId }, env.JWT_SECRET_KEY, {
        expiresIn: env.JWT_TOKEN_EXPIRATION,
        algorithm: 'HS256',
        issuer: 'UnBordo',
      });
      return token;
    } catch {
      throw new CustomError('Error generating token', 'JWT token error', 401);
    }
  }

  async verify(token: string): Promise<boolean> {
    if (!token) {
      throw new CustomError('Invalid input token', 'JWT token error', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET_KEY);
    if (!decoded) {
      return false;
    }

    return true;
  }

  async decrypt(token: string): Promise<object> {
    return new Object(jwt.decode(token));
  }
}
