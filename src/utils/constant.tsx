import { Dimensions } from "react-native"

// Dimension
export const dimensionWidth = Dimensions.get('window').width
export const dimensionHeight = Dimensions.get('window').height

// Color
export const primary = `#1DA1F2`
export const white = `#FFFFFF`
export const light_gray = `#E1E8ED`
export const dark_gray = `#66757F`
export const dark = `#15202B`

// Font
export const fontStandard = 12 * (dimensionWidth / 375)
export const fontTitle = 15 * (dimensionWidth / 375)
export const fontExtra = 18 * (dimensionWidth / 375)
export const font = {
    BrandonRegular: 'HvDTrial Brandon Grotesque Regular',
    BrandonBold: 'HvDTrial Brandon Grotesque Bold',
    BrandonItalic: 'HvDTrial Brandon Grotesque Italic',
    BrandonLight: 'HvDTrial Brandon Grotesque Light',
}

// Icon
export const sizeIconRegular = 24
export const sizeIconExtra = 100
export const border_radius_button = 7.5

// Async Storage
export const ASlanguage = `language`

// table watermelonDB
export const tableRoutine = `routines`

// Language
export const Indonesia = `ID`
export const English = `EN`
export const Melayu = `MY`
export const regular = `biasa`
export const sunda = `sunda`
export const jawa = `jawa`
export const minang = `minang`
export const betawi = `betawi`
export const listFeel = [
    {
        id: regular,
        title: 'Biasa'
    },
    {
        id: sunda,
        title: 'Campur Sunda'
    },
    {
        id: jawa,
        title: 'Campur Jawa'
    },
    {
        id: minang,
        title: 'Campur Minang'
    },
    {
        id: betawi,
        title: 'Campur Betawi'
    },
]
export const traslateIndonesia: { [key: string]: { [key: string]: string } } = {
    'biasa': {
        'aku': 'aku',
        'kamu': 'kamu'
    },
    'sunda': {
        'aku': 'aing',
        'kamu': 'maneh'
    },
    'jawa': {
        'aku': 'kula',
        'kamu': 'kowe'
    },
    'minang': {
        'aku': 'denai',
        'kamu': 'ang'
    },
    'betawi': {
        'aku': 'gue',
        'kamu': 'lu'
    }
}

// extras
export const durationSnackBar = 1500
  