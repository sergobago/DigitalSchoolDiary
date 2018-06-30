export const actionUserDataLogout = (history) => {
    history.push('/login');
    return { type: "USERTOKEN_LOGOUT" };
};