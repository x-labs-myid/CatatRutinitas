import { useAtom } from "jotai"
import { atomWithStorage } from 'jotai/utils'
import { languageAtom, feelAtom } from "@store/persist"
import { English, Indonesia, Melayu, traslateIndonesia } from "@utils/constant"

const useSetting = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    
    function translate(word: string) {
        if(language === English) return word
        if(language === Melayu) return word
        if([Indonesia, undefined].includes(language) && feel !== null) return traslateIndonesia[feel][word]
        else return word
    }

    function theme() {

    }
    
    return {
        translate,
        theme
    }
}

export default useSetting
