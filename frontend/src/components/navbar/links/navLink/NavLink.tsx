"use client";

import Link from "next/link";
import styles from "./navlink.module.css";
import { usePathname } from "next/navigation";

/*interface Link {
    title: string;
    path: string;
}*/

const NavLink = ({ item }) => {
    const pathName = usePathname();

    return (
        <Link
            href={item.path}
            className={`${styles.container} ${
                pathName === item.path && styles.active
            }`}
        >
            {item.title}
        </Link>
    );
};

export default NavLink;