import { white } from '@shared/utils/constant';
import React, { ReactNode, useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const WrapActionSheet = ({ children }: { children: ReactNode }) => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SheetProvider context="global">
                {children}
            </SheetProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
});

export default WrapActionSheet;