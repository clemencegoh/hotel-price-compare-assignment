import {showSuccessNotification, ToastNotificationService, showErrorNotification} from './notificationService';

describe('toastNotificationService', () => {
    const mockEnqueueSnackbar = jest.fn();
    it('should display success message', () => {
        ToastNotificationService.enqueueSnackbar = mockEnqueueSnackbar;
        showSuccessNotification('success');
        expect(mockEnqueueSnackbar).toBeCalledWith('success', {variant: 'success'});
    });

    it('should display error message', () => {
        ToastNotificationService.enqueueSnackbar = mockEnqueueSnackbar;
        showErrorNotification('error');

        // This is intentional, capitalize FIRST letter
        expect(mockEnqueueSnackbar).toBeCalledWith('Error', {variant: 'error', persist: false});
    });
});
