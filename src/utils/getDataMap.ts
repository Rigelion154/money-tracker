export const getDataMap = (array: any[], key: string) => array.reduce((acc, current) => {
    if (!acc[current[key]]) acc[current[key]] = current;
    return acc;
}, {})