import { Text } from './text';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface IProps<T extends FieldValues = FieldValues> {
  errors: FieldErrors<T>;
  path: keyof T | 'root';
}

export function FormErrorMessage<T extends FieldValues>({
  errors,
  path,
}: IProps<T>): JSX.Element {
  if (errors[path] && errors[path]['message']) {
    return (
      <Text className="font-raleway text-red-500 text-sm m-0 p-0">
        {errors[path]['message'] as string}
      </Text>
    );
  }

  return <></>;
}
