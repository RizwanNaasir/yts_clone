import {useEffect, useState} from 'react';

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export const usePersistedState = <T>(key: string, defaultValue: T): [T, SetValue<T>] => {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};
