import { useQuery } from '@tanstack/react-query';

type DataType = {
    // defina o tipo da sua data aqui
};

const fetchData = async (): Promise<DataType> => {
    const res = await fetch('/api/data');
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export const useFetchData = () => {
    return useQuery<DataType>(['data'], fetchData);
};

