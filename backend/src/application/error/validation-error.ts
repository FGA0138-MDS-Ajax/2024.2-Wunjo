import { CustomError, FieldIssueBase } from '.';

export class ValidationError extends CustomError {
  public fields: FieldIssueBase[];

  public showMessage: boolean;

  constructor(fields: FieldIssueBase[], showMessage: boolean = false) {
    super('Atributos inválidos', 'ValidationError', 400, fields);

    this.fields = fields;
    this.showMessage = showMessage;
  }
}
