import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from "aws-amplify";
import App from './App.tsx'

import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import './index.css'
import "./test-data.ts";

Amplify.configure(outputs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
