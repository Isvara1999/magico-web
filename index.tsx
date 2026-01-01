import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import Main from './Main';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const App = () => {
  return <Main />;
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);