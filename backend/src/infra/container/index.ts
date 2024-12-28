import { configureApplicationDI } from './application';
import { configureInfraDI } from './infra';

export function configureDI() {
  return configureInfraDI().extend(configureApplicationDI);
}

export const container = configureDI();

export default configureDI;
