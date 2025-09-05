import { useAtom } from "jotai"
import { languageAtom, feelAtom } from "@shared/jotai/atomSetting"
import { English, Indonesia, Melayu, traslateIndonesia } from "@shared/utils/constant"

const useSetting = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    
    function translate(word: string) {
        if(language === English) return word
        if(language === Melayu) return word
        if([Indonesia, null].includes(language) && feel !== null) return traslateIndonesia[feel][word]
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
