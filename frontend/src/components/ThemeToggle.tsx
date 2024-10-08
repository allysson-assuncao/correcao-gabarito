"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ThemeToggle() {
    const { setTheme, themes } = useTheme()

    const modes = [
        'light',
        'dark',
    ]

    const colors = [
        { name: 'green', hex: '#4CAF50' },  // Adicionando código hexadecimal
        { name: 'purple', hex: '#9C27B0' },
    ]

    const [mode, setMode] = useState<string>('light')
    const [color, setColor] = useState<string>('green')
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        // Marque o componente como montado no cliente
        setIsMounted(true)

        // Verifique se o localStorage está disponível antes de acessá-lo
        const savedMode = typeof window !== 'undefined' ? localStorage.getItem('mode') : null
        const savedColor = typeof window !== 'undefined' ? localStorage.getItem('color') : null

        if (savedMode) {
            setMode(savedMode)
        }
        if (savedColor) {
            setColor(savedColor)
        }
    }, [])

    useEffect(() => {
        if (isMounted) {
            setTheme(`${mode}-${color}`)
            localStorage.setItem('mode', mode)
            localStorage.setItem('color', color)
        }
    }, [mode, color, setTheme, isMounted, themes])

    return (
        <div className="flex gap-4 items-center">
            {/* Botão de Alternar Tema */}
            <Button variant="outline" size="icon" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                {mode === 'light' ? (
                    <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Alternar tema</span>
            </Button>

            {/* Dropdown para Seleção de Cores */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                        <span
                            className="block h-4 w-4 rounded-full mr-2"
                            style={{ backgroundColor: colors.find(c => c.name === color)?.hex }}
                        />
                        Cor: {color.charAt(0).toUpperCase() + color.slice(1)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {colors.map(c => (
                        <DropdownMenuItem key={c.name} onClick={() => setColor(c.name)}>
                            <span
                                className="block h-4 w-4 rounded-full mr-2"
                                style={{ backgroundColor: c.hex }}
                            />
                            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
