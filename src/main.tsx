import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/Global'
import { theme } from './styles/Theme'
import { HashRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <GlobalStyles/>
                    <App />
                </HashRouter>
            </ThemeProvider>
    // {/* </React.StrictMode>, */}
)
