import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import styled, { StyleSheetManager, ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/Global'
import { theme } from './styles/Theme'
import { HashRouter } from 'react-router-dom'
import './firebase';
import { Provider } from 'react-redux'
import store from "./rdx/store";
import isPropValid from '@emotion/is-prop-valid'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <StyleSheetManager
            enableVendorPrefixes
            shouldForwardProp={(propName, elementToBeRendered) => {
                return typeof elementToBeRendered === 'string' ? isPropValid(propName) : true;
            }}
        >
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <HashRouter>
                        <GlobalStyles/>
                        <App />
                    </HashRouter>
                </Provider>
            </ThemeProvider>
        </StyleSheetManager>
    // {/* </React.StrictMode>, */}
)
