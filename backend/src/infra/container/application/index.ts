import { configureInfraDI } from '../infra';
import { configureApplicationServiceDI } from './services';
import { configureApplicationUsecaseDI } from './usecase';

export function configureApplicationDI() {
  return configureInfraDI()
    .extend(configureApplicationUsecaseDI)
    .extend(configureApplicationServiceDI);
}
