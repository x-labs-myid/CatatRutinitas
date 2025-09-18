import { ReactNode } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native"

const ScrollKeyboard = ({ children }: { children: ReactNode }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ScrollKeyboard