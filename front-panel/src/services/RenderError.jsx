export const renderError = (fieldName, errors) => {
    if (errors[fieldName]) {
        return <div className="text-danger">{errors[fieldName]}</div>;
    }
    return null;
};
