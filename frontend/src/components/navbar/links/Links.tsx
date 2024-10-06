"use client";

import { useState } from "react";
import styles from "./link.module.css";
import Image from "next/image";
import NavLink from "@/components/navbar/links/navLink/NavLink";

const links = [
    {
        title: "Home",
        path: "/home",
    },
    {
        title: "Admin",
        path: "/home/admin",
    },
    {
        title: "Contact",
        path: "/contact",
    },
    {
        title: "Blog",
        path: "/blog",
    },
];

const Links = ({}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map((link) => (
                    <NavLink item={link} key={link.title} />
                ))}
                    <NavLink item={{ title: "Login", path: "/login" }} />
            </div>
            <Image
                className={styles.menuButton}
                src="/menu.png"
                alt=""
                width={30}
                height={30}
                onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <NavLink item={link} key={link.title} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Links;