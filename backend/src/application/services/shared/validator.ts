export interface Validator<Output extends object> {
  validate: (input: any) => Promise<Output>;
}
