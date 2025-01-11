export interface Cryptographer {
  compare: (password_hash: string, password_input: string) => Promise<boolean>;
}
