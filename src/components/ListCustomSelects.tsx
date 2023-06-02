import React from 'react';
import CustomSelect from './CustomSelect';
import {SelectType} from "./filterLists";

export interface CustomOption {
    options: SelectType[];
    label: string;
    value: SelectType;
    setValue: React.Dispatch<React.SetStateAction<SelectType>>;
}

interface DynamicSelectsProps {
    options: CustomOption[];
}

const DynamicSelects: React.FC<DynamicSelectsProps> = ({options}) => {
    return (
        <div>
            {options.map((option, index) => (
                <CustomSelect
                    key={index}
                    options={option.options}
                    label={option.label}
                    value={option.value}
                    setValue={option.setValue}
                />
            ))}
        </div>
    );
};

export default DynamicSelects;
