
import { MstrTokenService } from '../services/mstrtoken.service'

export function mstrInitializer(authenticationService: MstrTokenService) {
    return () =>
        new Promise(resolve => {
            if (localStorage.getItem('_reftoken')) {
                // attempt to refresh token on app start up to auto authenticate
                authenticationService
                    .mstrRefreshToken()
                    .subscribe()
                    .add(resolve);
            }
            else {
                resolve('Unauthorized')
            }
        });
}
