import { getReadableError } from '@/utils/ErrorHandlers';
import {DefaultOptions, QueryCache, QueryClient} from '@tanstack/react-query';
import { showErrorNotification } from '../notifications/notificationService';


export default function customHookQueryWithInterceptor() {
    const handleErrors = (error: any) => {
      if (error?.status === 401 || getReadableError(error).toUpperCase().includes('UNAUTHORIZED')) {
        // INCOMPLETE: usually want to handle this to sign user out
        console.error('unauthorized')
        return;
      }
      showErrorNotification(getReadableError(error));
    };

    return new QueryClient({
        defaultOptions: {
            queries: {
                onError: handleErrors,
            },
        } as DefaultOptions,
        queryCache: new QueryCache({
            onError: handleErrors,
        }),
    });
}
