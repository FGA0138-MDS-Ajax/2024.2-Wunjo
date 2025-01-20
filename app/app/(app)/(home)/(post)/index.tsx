import { useRouter } from 'expo-router';
import { TextInput, View } from 'react-native';
import { BackHeader } from '@/components/ui/backheader';
import { Button } from '@/components/ui/button2';
import SVGPhotoIcon from '@/assets/images/PhotoIcon';
import SVGGalleryIcon from '@/assets/images/GalleryIcon';
import UserIcon from '@/assets/images/UserIcon';
import { usePostQuestion } from './post';
import { Controller } from 'react-hook-form';
import { FormErrorMessage } from '@/components/ui/FormErrorMessage';
import { Box } from '@/components/ui/box';

export default function Screen() {
  const router = useRouter();

  const {
    form: {
      control,
      getValues,
      setValue,
      setError,
      formState: { errors },
    },
  } = usePostQuestion();

  const handleNextPage = () => {
    if (getValues('description').trim() === '') {
      setError('description', {
        type: 'required',
        message: 'Digite sua dúvida',
      });
      return;
    }

    console.log(getValues('description').trim());

    setValue('description', getValues('description').trim());
    router.push('/(app)/(home)/(post)/(tag)');
  };

  return (
    <View
      style={{
        height: '100%',
      }}
    >
      <BackHeader onPress={() => router.back()} label="">
        <Button
          onPress={handleNextPage}
          style={{
            width: 100,
            height: 25,
            padding: 0,
            maxHeight: 25,
            marginLeft: 'auto',
            marginRight: 15,
          }}
          label="Publicar"
        />
      </BackHeader>

      <View
        style={{
          // backgroundColor: "green",
          flex: 5,
        }}
      >
        <Box className="ml-6">
          <FormErrorMessage errors={errors} path="description" />
        </Box>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <UserIcon
            width={58}
            height={58}
            style={{
              // backgroundColor: "red",
              margin: 20,
              alignSelf: 'flex-start',
            }}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="font-raleway"
                placeholderTextColor="#969696"
                style={{
                  height: '90%',
                  flex: 1,
                  textAlignVertical: 'top',
                  color: '#000',
                }}
                multiline={true}
                numberOfLines={25}
                placeholder="Digite aqui sua dúvida..."
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: 'rgba(18,18,20, 0.1)',
            // backgroundColor: "red",
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 20,
            paddingHorizontal: 20,
          }}
        >
          <SVGPhotoIcon />
          <SVGGalleryIcon />
        </View>
      </View>
    </View>
  );
}
