import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@/index.css';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev/index.js";
import { initAnalytics } from '@/lib/analytics';
import { LanguageProvider } from '@/i18n';

initAnalytics();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </DevSupport>
    </React.StrictMode>
);
