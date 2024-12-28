import { configureInfraRepositoryDI } from './repositories';
import { configureInfraServiceDI } from './services';

export function configureInfraDI() {
  return configureInfraRepositoryDI().extend(configureInfraServiceDI);
}

export type InfraDI = ReturnType<typeof configureInfraDI>;
