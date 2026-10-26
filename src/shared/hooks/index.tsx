import { useAtom } from "jotai"
import { languageAtom, feelAtom } from "@shared/atom/atomSetting"
import { English, Indonesia, listMonthEN, listMonthID, listMonthMY, listWordNotification, listWordNotificationEN, listWordNotificationMY, listWordSleepNotification, listWordSleepNotificationEN, listWordSleepNotificationMY, Melayu, traslateIndonesia } from "@shared/utils/constant"
import wordsMY from "@services/data/my"
import wordsEN from "@services/data/en"
import { capitalizeFirstLetter } from "@shared/utils"

const useGlobal = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)

    const translateGlobal = (text: string) => {
        if (language == Indonesia) {
            let split = text.split(' ')
            let result = split.map((word, i) => {
                if (word.toLowerCase() == 'aku') {
                    if (i == 0) return capitalizeFirstLetter(traslateIndonesia[feel!]['aku'])
                    return traslateIndonesia[feel!]['aku']
                }
                if (word.toLowerCase() == 'kamu') {
                    if (i == 0) return capitalizeFirstLetter(traslateIndonesia[feel!]['kamu'])
                    return traslateIndonesia[feel!]['kamu']
                }
                return word
            })
            return result.join(' ')
        }
        if (language == Melayu) return wordsMY[text]
        if (language == English) return wordsEN[text]
    }

    const getRandomNotification = () => {
        const randomNumber = Math.floor(Math.random() * listWordNotification.length)
        if (language == Indonesia) return listWordNotification[randomNumber]
        if (language == English) return listWordNotificationEN[randomNumber]
        if (language == Melayu) return listWordNotificationMY[randomNumber]
    }

    const getRandomSleepNotification = () => {
        const randomNumber = Math.floor(Math.random() * listWordSleepNotification.length)
        if (language == Indonesia) return listWordSleepNotification[randomNumber]
        if (language == English) return listWordSleepNotificationEN[randomNumber]
        if (language == Melayu) return listWordSleepNotificationMY[randomNumber]
    }

    const dateWithMonthTextFormat = (date: string, language: string) => {
        const d = new Date(date)
        const day = d.getDate().toString().padStart(2, '0')
        const month = d.getMonth() + 1
        const year = d.getFullYear()
        if (language === Indonesia) return `${day} ${listMonthID[month - 1]} ${year}`
        if (language === English) return `${day} ${listMonthEN[month - 1]} ${year}`
        if (language === Melayu) return `${day} ${listMonthMY[month - 1]} ${year}`
    }

    return {
        translateGlobal,
        getRandomNotification,
        getRandomSleepNotification,
        dateWithMonthTextFormat,
    }
}

export default useGlobal
