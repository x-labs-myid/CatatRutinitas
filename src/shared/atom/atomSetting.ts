import { atomWithStorage } from 'jotai/utils';
import { Indonesia, primary, regular } from '@shared/utils/constant';
import { mmkvStorage } from '@services/stores/mmkv';

export const userAtom = atomWithStorage<string | null>('user', null, mmkvStorage);

export const themeAtom = atomWithStorage<string | null>('theme', null, mmkvStorage);

export const languageAtom = atomWithStorage<string | null>('language', null, mmkvStorage);

export const feelAtom = atomWithStorage<string | null>('feel', null, mmkvStorage);

export const descRoutineAtom = atomWithStorage<boolean>('descRoutine', false, mmkvStorage);