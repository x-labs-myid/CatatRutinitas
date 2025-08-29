import { useAtom } from "jotai"
import { atomWithStorage } from 'jotai/utils'
import { languageAtom, feelAtom } from "@store/persist"
import { traslateIndonesia } from "@utils/constant"

const useLanguage = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [feel, setFeel] = useAtom(feelAtom)
    
    function translate(word: string) {
        if(language === 'id' && feel !== null) return traslateIndonesia[feel][word]
        if(language === 'en') return word
        if(language === 'my') return word
    }

    function theme() {

    }
    
    return {
        translate,
        theme
    }
}

export default useLanguage
