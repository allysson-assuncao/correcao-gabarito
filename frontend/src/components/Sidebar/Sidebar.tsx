/*
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { setTheme, setPrimaryColor } from '@/store/slices/themeSlice';
import { Switch } from '@shadcn/ui';
import { HexColorPicker } from 'react-colorful';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const primaryColor = useSelector((state: RootState) => state.theme.primaryColor);

    const toggleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    };

    const handleColorChange = (color: string) => {
        dispatch(setPrimaryColor(color));
    };

    return (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Preferências</h2>

            <div className="mb-6">
                <label className="flex items-center justify-between">
                    <span>Modo Escuro</span>
                    <Switch checked={theme === 'dark'} onChange={toggleTheme} />
                </label>
            </div>

            <div>
                <label className="block mb-2">Cor Primária</label>
                <HexColorPicker color={primaryColor} onChange={handleColorChange} />
                <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="mt-2 p-2 border rounded w-full"
                />
            </div>
        </div>
    );
};

export default Sidebar;
*/
