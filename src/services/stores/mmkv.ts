import { MMKV } from 'react-native-mmkv'

export const mmkv = new MMKV()

// Wrapper untuk SyncStorage
export const mmkvStorage = {
    getItem: (key: string) => {
        const value = mmkv.getString(key);
        return value ? JSON.parse(value) : null;
    },
    setItem: (key: string, value: any) => {
        try {
            mmkv.set(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to MMKV', e);
        }
    },
    removeItem: (key: string) => {
        mmkv.delete(key);
    }
}