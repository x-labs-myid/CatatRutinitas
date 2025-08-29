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

// Language
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
  