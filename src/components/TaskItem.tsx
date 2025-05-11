import React, {useEffect} from 'react';
import {Box, Text, Button, HStack} from '@gluestack-ui/themed';
import {TaskItemProps} from '../types/types';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../styles/colors';

export default function TaskItem({task, onToggle, onRemove}: TaskItemProps) {
  const translateX = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const DURATION = 350;

  useEffect(() => {
    translateX.value = withTiming(0, {duration: DURATION});
    opacity.value = withTiming(1, {duration: DURATION});
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    opacity: opacity.value,
    marginBottom: 8,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Box
        borderRadius="$lg"
        padding="$4"
        bg={task.completed ? '$green100' : '$yellow100'}>
        <HStack alignItems="center" justifyContent="space-between">
          <Button
            onPress={() => onToggle(task.id, !task.completed)}
            bg="transparent"
            justifyContent="center"
            alignItems="center"
            padding="$2">
            <Icon
              name={task.completed ? 'check-circle' : 'circle'}
              size={24}
              color={task.completed ? colors.green : colors.yellow}
            />
          </Button>
          <Box flex={1} marginLeft="$3">
            <Text
              fontSize="$md"
              fontWeight="$semibold"
              color={task.completed ? '$textLight400' : '$textDark900'}
              strikeThrough={task.completed}>
              {task.title}
            </Text>

            <Text
              fontSize="$sm"
              color={task.completed ? '$textLight300' : '$textDark700'}
              strikeThrough={task.completed}>
              {task.description}
            </Text>
          </Box>

          <Button
            onPress={() => onRemove(task.id)}
            bg="transparent"
            justifyContent="center"
            alignItems="center"
            padding="$2"
            marginLeft="$2">
            <Icon name="delete" size={24} color={colors.red} />
          </Button>
        </HStack>
      </Box>
    </Animated.View>
  );
}
