import { Validator } from "@/application/services";
import { LoginUsecase } from "@/application/usecases/auth/login-usecase";
import { ValidationError } from '@/application/error';
import { z } from 'zod';
export class LoginZodValidator implements Validator<LoginUsecase.Input> {
    private readonly schema = z
        .object({
          registration: z.string().length(9),
          password: z.string().min(8).max(255),
        })
        .refine((data) => {
            if (
              Number(data.registration[0]) > 2 || Number(data.registration[0]) < 1
            ) {
              return false;
            }
      
            return true;
          });
    
    
    async validate(input: any): Promise<LoginUsecase.Input> {
        const validateResult = await this.schema.safeParseAsync(input);
        if(!(validateResult).success) {
            throw new ValidationError(validateResult.error.issues);
        }
        
        return validateResult.data as LoginUsecase.Input;
    }

}