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

    const colors = [
        { name: 'green', hex: '#22c55e', label: 'verde' },
        { name: 'blue', hex: '#3b82f6', label: 'azul' },
        { name: 'purple', hex: '#6d28d9', label: 'roxo' },
        { name: 'red', hex: '#dc2626', label: 'vermelho' },
        { name: 'gray', hex: '#4b5563', label: 'cinza' },
        { name: 'orange', hex: '#ea580c', label: 'laranja' },
        { name: 'yellow', hex: '#facc15', label: 'amarelo' },
    ]

    const [mode, setMode] = useState<string>('light')
    const [color, setColor] = useState<string>('green')
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {

        setIsMounted(true)

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
            <Button variant="outline" size="icon" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                {mode === 'light' ? (
                    <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Alternar tema</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                        Cor:
                        <div className={"pr-2"}></div>
                        <span
                            className="block h-4 w-4 rounded-full mr-2"
                            style={{ backgroundColor: colors.find(c => c.name === color)?.hex }}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {colors.map(c => (
                        <DropdownMenuItem key={c.name} onClick={() => setColor(c.name)}>
                            <span
                                className="block h-4 w-4 rounded-full mr-2"
                                style={{ backgroundColor: c.hex }}
                            />
                            {c.label.charAt(0).toUpperCase() + c.label.slice(1)}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
