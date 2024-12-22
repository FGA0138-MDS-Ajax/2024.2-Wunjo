export type FieldIssueBase = {
  path: (string | number)[];
  message?: string;
};

export class CustomError extends Error {
  status: number;
  fields?: FieldIssueBase[];

  constructor(
    message: string,
    name: string = 'ApiError',
    status: number = 400,
    fields?: FieldIssueBase[],
  ) {
    super();

    this.message = message;
    this.name = name;
    this.status = status;
    this.fields = fields;
  }
}
