import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const [primaryColor, setPrimaryColor] = useState('#1976d2'); // Cor padrão azul do MUI

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const savedColor = localStorage.getItem('primaryColor');
        if (savedTheme) setTheme(savedTheme);
        if (savedColor) setPrimaryColor(savedColor);
    }, []);

    const toggleDrawer = (state: boolean) => {
        setOpen(state);
    };

    const handleThemeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newTheme = event.target.value as string;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme); // Aplica tema
    };

    const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newColor = event.target.value as string;
        setPrimaryColor(newColor);
        localStorage.setItem('primaryColor', newColor);
        document.documentElement.style.setProperty('--primary-color', newColor); // Aplica cor
    };

    return (
        <>
            <IconButton edge="end" color="inherit" onClick={() => toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Theme</InputLabel>
                            <Select value={theme} onChange={handleThemeChange}>
                                <MenuItem value="light">Light</MenuItem>
                                <MenuItem value="dark">Dark</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Primary Color</InputLabel>
                            <Select value={primaryColor} onChange={handleColorChange}>
                                <MenuItem value="#1976d2">Blue</MenuItem>
                                <MenuItem value="#e91e63">Pink</MenuItem>
                                <MenuItem value="#4caf50">Green</MenuItem>
                                <MenuItem value="#ff9800">Orange</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
