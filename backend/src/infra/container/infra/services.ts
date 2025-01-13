import { DispatchEmailService } from '@/application/services';
import { PasswordHash } from '@/application/services/password';
import {
  BcryptPasswordHash,
  DispatchEmailJobService,
  JWTStudentTokenManager,
  ProviderEmailServiceFacade,
} from '@/infra/services';
import { DIRepository } from './repositories';

export function configureInfraServiceDI(container: DIRepository) {
  return container
    .add(DispatchEmailService.Name, () => new DispatchEmailJobService())
    .add(PasswordHash.Name, () => new BcryptPasswordHash())
    .add('StudentTokenManager', () => new JWTStudentTokenManager())
    .add('ProviderEmailServiceFacade', () => new ProviderEmailServiceFacade());
}
