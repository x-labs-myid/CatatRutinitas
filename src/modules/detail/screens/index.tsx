import { Text } from "react-native"

const DetailScreen = ({ route }: { route: any }) => {
    const { id } = route.params
    return (
        <>
            <Text>{id}</Text>
        </>
    )
}

export default DetailScreen