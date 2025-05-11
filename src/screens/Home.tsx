import React, {useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTasks} from '../hooks/useTask';
import TaskItem from '../components/TaskItem';
import {useForm, Controller} from 'react-hook-form';
import {FormData} from '../types/types';
import {styles} from '../styles/style';
import {MSG_TITLE, MSG_NOT_ADD, MSG_DESCRIPTION, MSG_HOME} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/colors';

/**
 * Component to render the home screen with a form to add tasks and a FlatList to show the tasks.
 * @returns {JSX.Element}
 */
export default function Home() {
  const navigation = useNavigation();
  const {tasks, addTask, toggleTaskCompleted, removeTask} = useTasks();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setLoading(true);
    await addTask(data.title, data.description);
    reset();
    setLoading(false);
  }

  const handleBack = () => {
    reset();
    navigation.navigate('Login' as never);
  };

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-center text-blue-600">{MSG_HOME}</Text>
      <TouchableOpacity
        onPress={handleBack}
        disabled={loading}
        className={`items-center cursor-pointer justify-center bg-blue-600 p-3 rounded-full w-12 h-12 self-start ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}>
        <Icon name="arrow-left" size={24} color={colors.white} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white dark:bg-gray-900">
        <View className="flex-1 px-4 py-6">
          <View className="mb-6">
            <Controller
              control={control}
              name="title"
              defaultValue=""
              rules={{required: `${MSG_TITLE}`}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                  <TextInput
                    placeholder="Título da tarefa"
                    onChangeText={onChange}
                    value={value}
                    editable={!loading}
                    className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 mb-1 text-base text-black dark:text-white bg-white dark:bg-gray-800"
                  />
                  {error && (
                    <Text className="text-red-500 text-sm mb-2">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="description"
              defaultValue=""
              rules={{required: `${MSG_DESCRIPTION}`}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                  <TextInput
                    placeholder="Descrição da tarefa"
                    onChangeText={onChange}
                    value={value}
                    editable={!loading}
                    multiline
                    numberOfLines={3}
                    className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-base text-black dark:text-white bg-white dark:bg-gray-800 mb-1"
                  />
                  {error && (
                    <Text className="text-red-500 text-sm mb-2">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`items-center cursor-pointer justify-center bg-blue-600 p-3 rounded-full w-12 h-12 self-end ${
                loading ? 'opacity-50' : 'opacity-100'
              }`}>
              <Icon name="add" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TaskItem
                task={item}
                onToggle={toggleTaskCompleted}
                onRemove={removeTask}
              />
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-10">
                {MSG_NOT_ADD}
              </Text>
            }
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
