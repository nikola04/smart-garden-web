export const isValidProjectName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9_.\-\s]{2,30}$/;
    return nameRegex.test(name);
};
