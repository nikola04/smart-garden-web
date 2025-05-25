export const isValidDeviceName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9_.\-\s]{2,50}$/;
    return nameRegex.test(name);
};
