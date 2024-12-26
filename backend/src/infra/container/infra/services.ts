import { DispatchEmailService } from '@/application/services';
import { DispatchEmailJobService } from '@/infra/services/bullMq';
import { DIRepository } from './repositories';

export function configureInfraServiceDI(container: DIRepository) {
  return container.add(
    DispatchEmailService.Name,
    () => new DispatchEmailJobService(),
  );
}
