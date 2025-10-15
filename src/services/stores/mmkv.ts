import { MMKV } from 'react-native-mmkv'
import { Indonesia, primary, regular } from '@shared/utils/constant'

export const mmkv = new MMKV()

// Wrapper untuk SyncStorage
export const mmkvStorage = {
    getItem: (key: string) => {
        let v_default = null
        if(key == 'user') v_default = null
        if(key == 'theme') v_default = primary
        if(key == 'language') v_default = Indonesia
        if(key == 'feel') v_default = regular
        
        const value = mmkv.getString(key);
        return value ? JSON.parse(value) : v_default;
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