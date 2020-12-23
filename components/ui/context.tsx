import { createContext, FC, useContext, useMemo, useReducer } from 'react'

export interface Content {
  body: string
  link: string
  header: string
  footer: string
  apps: { appName: string; appDescription: string; technologies: { name: string }[] }[]
}

export interface Sections {
  about: Content
  hero: Content
  projects: Content
  contact: Content
}

export interface State {
  displaySidebar: boolean
  user?: Sections
}

const initialState: State = {
  displaySidebar: false,
  user: undefined,
}

type Action =
  | { type: 'OPEN_SIDEBAR' }
  | { type: 'CLOSE_SIDEBAR' }
  | { type: 'GET_USER'; payload: Sections }

const UIContext = createContext<State | any>(initialState)

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        displaySidebar: true,
      }

    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        displaySidebar: false,
      }

    case 'GET_USER':
      return {
        ...state,
        user: { ...action.payload },
      }

    default:
      throw new Error()
  }
}

const UIProvider: FC = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const getUser = (user: Sections) => dispatch({ type: 'GET_USER', payload: user })

  const value = useMemo(() => ({ ...state, openSidebar, closeSidebar, getUser }), [state])

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = useContext<State | any>(UIContext)

  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }

  return context
}

export const ManagedUIContext: FC = ({ children }) => <UIProvider>{children}</UIProvider>
