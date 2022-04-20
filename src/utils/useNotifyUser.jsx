import { toast } from "react-toastify";

/**
 *
 * @param {string} message Takes a message
 * @returns Alerts the user about the message without blocking the whole screen
 */
const notifyDefault = (message) => toast(message, { autoClose: 1200 });
const notifySuccess = (message) => toast.success(message, { autoClose: 1200 });
const notifyError = (message) => toast.error(message, { autoClose: 1200 });
const notifyInfo = (message) => toast.info(message, { autoClose: 7000 });

export { notifyDefault, notifySuccess, notifyError, notifyInfo };
