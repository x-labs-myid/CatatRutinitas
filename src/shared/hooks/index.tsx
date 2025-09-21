import { useAtom } from "jotai"
import { languageAtom, feelAtom } from "@shared/atom/atomSetting"
import { English, Indonesia, listWordNotification, listWordNotificationEN, listWordNotificationMY, listWordSleepNotification, listWordSleepNotificationEN, listWordSleepNotificationMY, Melayu, traslateIndonesia } from "@shared/utils/constant"
import wordsMY from "@services/data/my"
import wordsEN from "@services/data/en"

const useGlobal = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)

    const translateGlobal = (text: string) => {
        if(language == Indonesia) {
            let split = text.split(' ')
            let result = split.map((word) => {
                if(word.toLowerCase() == 'aku') return traslateIndonesia[feel!]['aku']
                if(word.toLowerCase() == 'kamu') return traslateIndonesia[feel!]['kamu']
                return word
            })
            return result.join(' ')
        }
        if(language == Melayu) return wordsMY[text]
        if(language == English) return wordsEN[text]
    }

    const getRandomNotification = () => {
        const randomNumber = Math.floor(Math.random() * listWordNotification.length)
        if(language == Indonesia) return listWordNotification[randomNumber]
        if(language == English) return listWordNotificationEN[randomNumber]
        if(language == Melayu) return listWordNotificationMY[randomNumber]
    }

    const getRandomSleepNotification = () => {
        const randomNumber = Math.floor(Math.random() * listWordSleepNotification.length)
        if(language == Indonesia) return listWordSleepNotification[randomNumber]
        if(language == English) return listWordSleepNotificationEN[randomNumber]
        if(language == Melayu) return listWordSleepNotificationMY[randomNumber]
    }
    
    return {
        translateGlobal,
        getRandomNotification,
        getRandomSleepNotification,
    }
}

export default useGlobal
