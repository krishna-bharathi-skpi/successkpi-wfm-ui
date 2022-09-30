
import { RefreshTokenService } from '../services/refreshtoken.service'

export function appInitializer(authenticationService: RefreshTokenService) {
    return () =>
        new Promise(resolve => {
            if (localStorage.getItem('_reftoken')) {
                // attempt to refresh token on app start up to auto authenticate
                authenticationService
                    .refreshToken()
                    .subscribe()
                    .add(resolve);
            }
            else {
                resolve('Unauthorized')
            }
        });
}
