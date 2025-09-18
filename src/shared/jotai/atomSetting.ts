import { atomWithStorage } from 'jotai/utils';
import { getAsyncStorage, removeAsyncStorage, setAsyncStorage } from '@shared/utils/index';
import { Indonesia, primary, regular } from '@shared/utils/constant';

export const userAtom = atomWithStorage<string | null>('user', null, {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});

export const themeAtom = atomWithStorage<string>('theme', primary, {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});

export const languageAtom = atomWithStorage<string>('language', Indonesia, {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});

export const feelAtom = atomWithStorage<string>('feel', regular, {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});

export const descRoutineAtom = atomWithStorage<boolean>('descRoutine', false, {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});