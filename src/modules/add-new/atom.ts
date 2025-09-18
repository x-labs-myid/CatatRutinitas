import { atom } from "jotai";

export const atomName = atom<string | null>(null)
export const atomDescription = atom<string | null>(null)
export const atomStartDate = atom<string | null>(null)
export const atomEndDate = atom<string | null>(null)
export const atomTotalTargetDay = atom<number | 0>(0)