import { useEffect, useCallback, useReducer } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => {
      if (state[1] === action) return state;
      return [false, action];
    },
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    const load = async () => {
      try {
        const value =
          Platform.OS === 'web'
            ? localStorage.getItem(key)
            : await AsyncStorage.getItem(key);

        if (state[1] !== value) {
          setState(value);
        }
      } catch (e) {
        console.error('Storage error:', e);
      }
    };

    load();
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      if (state[1] !== value) {
        setState(value);
        setStorageItemAsync(key, value);
      }
    },
    [key, state]
  );

  return [state, setValue];
}
