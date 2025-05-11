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
import {
  MSG_ERROR_DATES,
  MSG_NEW_REGISTER,
  MSG_OPEN_LOGIN,
  MSG_EMAIL,
  MSG_PASSWORD,
  MSG_FORMAT_EMAIL,
  MSG_SGIN
} from '../constants/constants';
import {useTasks} from '../hooks/useTask';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

export default function LoginScreen() {
  const {login} = useTasks();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function onSubmit(data: any) {
    if (!data.email || !data.password) {
      return Alert.alert('Erro', MSG_ERROR_DATES);
    }

    try {
      setLoading(true);
      await login(data.email, data.password);
      navigation.navigate('Home' as never);
    } catch (error: any) {
      Alert.alert('Erro no login', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-center text-blue-600">{MSG_SGIN}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-lime-500 justify-center items-center px-4">
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
                  <View className='flex-col w-full justify-center items-center mb-5 px-5'>
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
              className={`flex-row cursor-pointer justify-center items-center bg-green-600 p-3 rounded-md ${
                loading ? 'opacity-50' : ''
              }`}>
              <Icon name="login" size={24} color={colors.white} />
              <Text className="text-white ml-2">{MSG_OPEN_LOGIN}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Users' as never)}
              className="mt-4 cursor-pointer">
              <Text className="text-center text-blue-600 underline">
                {MSG_NEW_REGISTER}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
