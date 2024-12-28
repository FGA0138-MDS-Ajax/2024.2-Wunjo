export interface StudentTokenManager {
  generate: (data: object) => Promise<string>;
  verify: (token: string) => Promise<boolean>;
  decrypt: (token: string) => Promise<object>;
}
