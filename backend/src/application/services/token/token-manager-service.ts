export interface StudentTokenManagerGenerateInput {
  studentId: string;
}

export interface StudentTokenManager {
  generate: (data: StudentTokenManagerGenerateInput) => Promise<string>;
  verify: (token: string) => Promise<boolean>;
  decrypt: (token: string) => Promise<{
    studentId: string;
  }>;
}
