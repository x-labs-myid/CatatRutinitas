import { white } from '@shared/utils/constant';
import * as React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Menu } from 'react-native-paper';
import { Modal } from 'react-native-paper';
import { RoutineTable } from '@shared/types/db';
import { Text } from 'react-native-paper';
import useTableRoutine from '@services/db_local/routine/use';

const MenuAction = ({ id, data, visible, hideModal }: { id: string, data: RoutineTable | null, visible: boolean, hideModal: (isModify: boolean) => void }) => {
    const { update, del } = useTableRoutine()
    const deleteData = async () => {
        if (!id) return ToastAndroid.show('Data tidak ditemukan', ToastAndroid.SHORT)
        const result = await del(id)
        if (result) {
            ToastAndroid.show('Data berhasil dihapus', ToastAndroid.SHORT)
            hideModal(true)
        }
    }
    const updateData = async () => {
        if (!id) return ToastAndroid.show('Data tidak ditemukan', ToastAndroid.SHORT)

        let processDay: number = data?.processDay || 0
        const result = await update(id, {
            name: data?.name || '',
            description: data?.description || '',
            startDate: data?.startDate || '',
            endDate: data?.endDate || '',
            processDay: processDay + 1,
            totalTargetDay: data?.totalTargetDay || 0,
            isCompleted: processDay + 1 === data?.totalTargetDay
        })

        if (result) {
            ToastAndroid.show('Data berhasil diupdate', ToastAndroid.SHORT)
            hideModal(true)
        }
    }
    return (
        <Modal visible={visible} onDismiss={() => hideModal(false)} contentContainerStyle={styles.container}>
            <Text variant="titleMedium" style={styles.text}>{data?.name}</Text>
            <Menu.Item leadingIcon="delete" onPress={() => deleteData()} title="Hapus" />
            <Menu.Item leadingIcon="pencil" onPress={() => console.log(`Navigate to edit screen`)} title="Ubah" />
            <Menu.Item leadingIcon="check" onPress={() => updateData()} title="Rutinitas Hari Ini Selesai" />
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white
    },
    text: {
        textAlign: 'center',
        marginVertical: 16
    }
})

export default MenuAction;