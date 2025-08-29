import { atomWithStorage } from 'jotai/utils';
import { getAsyncStorage, removeAsyncStorage, setAsyncStorage } from '@utils/index';
import { primary } from '@utils/constant';

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

export const languageAtom = atomWithStorage<string>('language', 'ID', {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});

export const feelAtom = atomWithStorage<string>('feel', 'biasa', {
    getItem: getAsyncStorage,
    setItem: setAsyncStorage,
    removeItem: removeAsyncStorage,
});