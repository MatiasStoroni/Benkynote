// app/api/auth/[auth0]/route.js

import { handleAuth, handleLogin } from "@auth0/nextjs-auth0"

export const GET = handleAuth(
    {
        signup: handleLogin({
            returnTo: '/api/auth/login',
            authorizationParams: {
                screen_hint: 'signup',
                screen_hint: 'signup',
                action: 'signup',
                audience: 'https://Benkynote',
                
            }
        }),

        login: handleLogin({
            returnTo: '/personal/main',
            authorizationParams: {

                audience: 'https://Benkynote'
            }
        }),
    }
);


