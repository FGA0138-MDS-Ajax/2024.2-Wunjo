export namespace PasswordHash {
  export const Name = 'PasswordHash';
}

export interface PasswordHash {
  hash: (password: string) => Promise<string>;
  compare: (password: string, hash: string) => Promise<boolean>;
}
