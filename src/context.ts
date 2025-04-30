import { createContext } from 'react'
import { AppActions, AppState } from './types'

export const AppContext = createContext<[AppState, AppActions] | null>(null)
