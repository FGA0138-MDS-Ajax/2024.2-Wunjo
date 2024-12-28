import { DispatchEmailService } from '@/application/services';
import { PasswordHash } from '@/application/services/password';
import { DispatchEmailJobService } from '@/infra/services/bullMq';
import { BcryptPasswordHash } from '@/infra/services/password';
import { DIRepository } from './repositories';

export function configureInfraServiceDI(container: DIRepository) {
  return container
    .add(DispatchEmailService.Name, () => new DispatchEmailJobService())
    .add(PasswordHash.Name, () => new BcryptPasswordHash());
}
