import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useTasks} from '../hooks/useTask';
import {User} from '../types/types';
import {colors} from '../styles/colors';
import {
  MSG_EMAIL,
  MSR_ERROR_REGISTER,
  MSG_LOGIN,
  MSG_REGISTER,
  MSG_PASSWORD,
  MSG_FORMAT_EMAIL,
  MSG_PROFILE
} from '../constants/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Users() {
  const {createUser} = useTasks();
  const {control, handleSubmit, reset} = useForm<User>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function onSubmit(data: User) {
    try {
      setLoading(true);
      await createUser(data.email, data.password);
      reset();
      navigation.navigate('Login' as never);
    } catch (error: any) {
      Alert.alert(MSR_ERROR_REGISTER, error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-center text-blue-600">{MSG_PROFILE}</Text>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-neutral-500 justify-center items-center px-4">
      <View className="w-full max-w-md">
        <View className="gap-4">
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: `${MSG_EMAIL}`,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: `${MSG_FORMAT_EMAIL}`,
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <View className='flex-col w-full mb-5 px-5 justify-center items-center'>
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                  className="w-full border border-gray-300 p-3 rounded-md text-base bg-white"
                />
                {error && (
                  <Text className="text-red-500 text-sm mt-1">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{required: `${MSG_PASSWORD}`}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <View className='flex-col w-full px-5 justify-center items-center'>
                <TextInput
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                  className="w-full border border-gray-300 p-3 rounded-md text-base bg-white"
                />
                {error && (
                  <Text className="text-red-500 text-sm mt-1">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            className={`flex-row cursor-pointer justify-center items-center bg-blue-600 p-3 rounded-md ${
              loading ? 'opacity-50' : ''
            }`}>
            <Icon name="add" size={24} color={colors.white} />
            <Text className="text-white ml-2">{MSG_REGISTER}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            className="mt-4 cursor-pointer">
            <Text className="text-center text-white underline">
              {MSG_LOGIN}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    </View>
  );
}
