export namespace Logger {
  export type ErrorCategory = 'API' | 'HTTP' | 'MSG' | 'BWE';
}

export interface Logger {
  info: (message: string | object) => void;
  error: (error: any, message: string, category: Logger.ErrorCategory) => void;
}
