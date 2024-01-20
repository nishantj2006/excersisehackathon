import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-a6tpzpv7rao73mlp.us.auth0.com"
    clientId="8pgrQ9VQTlQKaKkSn4cQkg9HJ98lumnS"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/"
    }}
  >
    <App />
  </Auth0Provider>,
);