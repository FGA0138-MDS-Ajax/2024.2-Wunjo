export async function getError<Error>(call: () => unknown): Promise<Error> {
  try {
    await call();

    throw new Error('Test failed');
  } catch (error) {
    return error as Error;
  }
}
