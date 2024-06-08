import {getReadableError} from "@/utils/ErrorHandlers";
import _ from "lodash";
import {OptionsObject} from "notistack";

export abstract class ToastNotificationService {
    public static enqueueSnackbar: any;
}

export const showWarningNotification = (
    messageToDisplay: string,
    options?: OptionsObject
) => {
    ToastNotificationService.enqueueSnackbar(messageToDisplay, {
        ...options,
        variant: "warning",
    });
};

export const showSuccessNotification = (
    messageToDisplay: string,
    options?: OptionsObject
) => {
    ToastNotificationService.enqueueSnackbar(messageToDisplay, {
        ...options,
        variant: "success",
    });
};

export const showErrorNotification = (
    messageToDisplay: any,
    options: OptionsObject = {variant: "error", persist: false}
) => {
    const errorMessage = getReadableError(messageToDisplay);
    if (!errorMessage || errorMessage === "") {
        // suppress empty error messages
        return;
    }
    ToastNotificationService.enqueueSnackbar(_.capitalize(errorMessage), {
        persist: false,
        ...options,
        variant: "error",
    });
};

export const catchErrorAndShowNotification = (err: any) =>
    showErrorNotification(getReadableError(err));
