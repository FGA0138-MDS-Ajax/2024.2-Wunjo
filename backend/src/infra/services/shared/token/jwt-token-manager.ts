import { CustomError } from "@/application/error";
import { StudentRepository } from "@/application/repositories/student-repository";
import { StudentTokenManager } from "@/application/services/token/token-manager";
import { Student } from "@/domain";
import jwt from 'jsonwebtoken';

export class JWTStudentTokenManager implements StudentTokenManager {

    SECRET_KEY: string = "unbordoJWTsecretkey*4#$@);.";

    generate = async (data: object): Promise<string> => {
        try {
          const studentId = data.id;//getting the student id and passing on the token 
          const token: string = jwt.sign({ _id: studentId}, this.SECRET_KEY, {
                expiresIn: '7 days',
                algorithm: 'HS256'
            });
          return token;
        }
        catch(error) {
            throw new CustomError("Error generating token", "JWT Error", 401);
        }
    }

    verify = async(token: string): Promise<boolean> => {
        if(!token) {
            throw new CustomError("Invalid input token", "JWT Error", 401);
        }
        const decoded = jwt.verify(token, this.SECRET_KEY);
        if(!decoded) {
            return false;
        }
        return true;
    }

    decrypt = async(token: string): Promise<object> => {
        return Object(jwt.decode(token));
    }

}