"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface NavLinkItem {
    text: string;
    href: string;
}

interface DropdownColumn {
    heading: string;
    links: NavLinkItem[];
}

type DropdownData = DropdownColumn[];

interface MenuItem {
    label: string;
    href: string;
    dropdownData?: DropdownData;
}

type AnimationDirection = 'right-to-left' | 'left-to-right';

// HIVYA Shop Categories
const clothingDropdown: DropdownData = [
    { heading: 'Men', links: [{ text: 'T-Shirts & Polos', href: '/products?category=men-tshirts' }, { text: 'Shirts', href: '/products?category=men-shirts' }, { text: 'Jeans & Pants', href: '/products?category=men-jeans' }, { text: 'Jackets & Hoodies', href: '/products?category=men-jackets' }] },
    { heading: 'Women', links: [{ text: 'Dresses & Tops', href: '/products?category=women-dresses' }, { text: 'Ethnic Wear', href: '/products?category=women-ethnic' }, { text: 'Jeans & Trousers', href: '/products?category=women-jeans' }, { text: 'Winterwear', href: '/products?category=women-winter' }] },
    { heading: 'Trending', links: [{ text: 'New Arrivals 🔥', href: '/products?sort=newest' }, { text: 'Best Sellers', href: '/products?sort=bestseller' }, { text: 'Oversized Fits', href: '/products?category=oversized' }] },
];

const accessoriesDropdown: DropdownData = [
    { heading: 'Daily Essentials', links: [{ text: 'Watches', href: '/products?category=watches' }, { text: 'Wallets & Belts', href: '/products?category=wallets' }, { text: 'Sunglasses', href: '/products?category=sunglasses' }] },
    { heading: 'Bags & Shoes', links: [{ text: 'Backpacks', href: '/products?category=backpacks' }, { text: 'Sneakers', href: '/products?category=sneakers' }, { text: 'Caps', href: '/products?category=caps' }] },
];

const collectionsDropdown: DropdownData = [
    { heading: 'Exclusive Drop', links: [{ text: 'Summer 2026', href: '/collections/summer' }, { text: 'Streetwear Edition', href: '/collections/streetwear' }, { text: 'Minimalist Line', href: '/collections/minimalist' }] },
    { heading: 'Offers', links: [{ text: 'Flat 50% Off', href: '/products?discount=50' }, { text: 'Clearance Sale', href: '/products?sale=clearance' }] },
];

const menuItems: MenuItem[] = [
    { label: 'Clothing', href: '/products', dropdownData: clothingDropdown },
    { label: 'Accessories', href: '/products', dropdownData: accessoriesDropdown },
    { label: 'Collections', href: '/collections', dropdownData: collectionsDropdown },
    { label: 'Sale', href: '/products?sale=true' },
];

export const Navbar: React.FC = () => {
    const [activeMenuItemIndex, setActiveMenuItemIndex] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [animationDirection, setAnimationDirection] = useState<AnimationDirection>('right-to-left');
    const closeTimeoutRef = useRef<number | null>(null);
    const prevActiveMenuItemIndex = useRef<number | null>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [mobileActiveDropdownIndex, setMobileActiveDropdownIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeMenuItemIndex !== null && prevActiveMenuItemIndex.current !== null) {
            if (activeMenuItemIndex > prevActiveMenuItemIndex.current) {
                setAnimationDirection('right-to-left');
            } else {
                setAnimationDirection('left-to-right');
            }
        } else {
            setAnimationDirection('right-to-left');
        }
        prevActiveMenuItemIndex.current = activeMenuItemIndex;
    }, [activeMenuItemIndex]);

    const openDropdown = (index: number) => {
        if (closeTimeoutRef.current !== null) {
            clearTimeout(closeTimeoutRef.current);
        }
        setActiveMenuItemIndex(index);
        setIsDropdownOpen(true);
    };

    const closeDropdown = () => {
        closeTimeoutRef.current = window.setTimeout(() => {
            setIsDropdownOpen(false);
        }, 100);
    };

    const handleDropdownTransitionEnd = () => {
        if (!isDropdownOpen) {
            setActiveMenuItemIndex(null);
            prevActiveMenuItemIndex.current = null;
        }
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);
        if (!newState) {
            setMobileActiveDropdownIndex(null);
        }
    };

    const toggleMobileDropdown = (index: number) => {
        setMobileActiveDropdownIndex(mobileActiveDropdownIndex === index ? null : index);
    };

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdownIndex(null);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const contentVariants: { [key in AnimationDirection]: Variants } = {
        'right-to-left': {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0, transition: { opacity: { duration: 0.2 }, x: { duration: 0.25, ease: 'easeOut' } } },
            exit: { opacity: 0, x: -50, transition: { opacity: { duration: 0.2 }, x: { duration: 0.25, ease: 'easeIn' } } },
        },
        'left-to-right': {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0, transition: { opacity: { duration: 0.2 }, x: { duration: 0.25, ease: 'easeOut' } } },
            exit: { opacity: 0, x: 50, transition: { opacity: { duration: 0.2 }, x: { duration: 0.25, ease: 'easeIn' } } },
        }
    };

    const containerVariants: Variants = {
        closed: { opacity: 0, y: -8, pointerEvents: 'none' },
        open: { opacity: 1, y: 0, pointerEvents: 'auto' },
    };

    const mobileMenuVariants: Variants = {
        closed: { x: '100%' },
        open: { x: '0%' },
    };

    const mobileDropdownVariants: Variants = {
        closed: { height: 0, opacity: 0, overflowY: 'hidden' },
        open: { height: 'auto', opacity: 1, overflowY: 'visible' },
    };

    return (
        <motion.nav className="sticky top-0 w-full bg-[#111111]/90 backdrop-blur-md text-white z-50 border-b border-neutral-800">
            <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-6">
                
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider text-white no-underline">
                    <span className="text-[#0F3E2E] bg-emerald-400/20 px-2 py-0.5 rounded text-emerald-400">✦</span> HYVIA 
                </Link>

                {/* Desktop Menu */}
                <ul
                    className="hidden md:flex gap-8 list-none p-0 m-0 h-full items-center"
                    onMouseLeave={closeDropdown}
                >
                    {menuItems.map((item, index) => (
                        <li
                            key={`desktop-menu-${index}`}
                            className={`flex items-center h-full relative cursor-pointer text-sm font-medium transition-colors ${
                                activeMenuItemIndex === index && isDropdownOpen ? 'text-white' : 'text-neutral-400 hover:text-white'
                            }`}
                            onMouseEnter={() => item.dropdownData ? openDropdown(index) : closeDropdown()}
                        >
                            <Link href={item.href} className="py-2 no-underline text-inherit">
                                {item.label}
                            </Link>
                            {activeMenuItemIndex === index && isDropdownOpen && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right Side: Cart & User Account */}
                <div className="hidden md:flex items-center gap-5">
                    {/* Shopping Cart */}
                    <Link
                        href="/cart"
                        className="relative p-2 text-neutral-300 hover:text-white transition-colors"
                        aria-label="Shopping Cart"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute 1 top-0 right-0 bg-emerald-500 text-black text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                            0
                        </span>
                    </Link>

                    {/* Auth */}
                    <Link href="/login" className="text-sm font-medium text-neutral-300 hover:text-white px-2 py-1 no-underline">
                        Sign In
                    </Link>
                    <Link href="/register" className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors no-underline">
                        Join
                    </Link>
                </div>

                {/* Mobile Menu Hamburger */}
                <button 
                    className="md:hidden text-white focus:outline-none p-2" 
                    onClick={toggleMobileMenu} 
                    aria-label="Toggle mobile menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Desktop Mega Dropdown */}
            <AnimatePresence>
                {isDropdownOpen && activeMenuItemIndex !== null && menuItems[activeMenuItemIndex]?.dropdownData && (
                    <motion.div
                        key="desktop-dropdown-container"
                        className="hidden md:block absolute top-16 left-0 right-0 bg-[#111111]/95 backdrop-blur-xl border-b border-neutral-800 shadow-2xl"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={containerVariants}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => { if (closeTimeoutRef.current !== null) clearTimeout(closeTimeoutRef.current); }}
                        onMouseLeave={closeDropdown}
                        onAnimationComplete={handleDropdownTransitionEnd}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`desktop-dropdown-content-${activeMenuItemIndex}`}
                                variants={contentVariants[animationDirection]}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="max-w-screen-xl mx-auto px-8 py-8"
                            >
                                <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                                        Explore {menuItems[activeMenuItemIndex]?.label}
                                    </span>
                                    <Link 
                                        href={menuItems[activeMenuItemIndex]?.href || '/products'} 
                                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 no-underline"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {menuItems[activeMenuItemIndex]?.dropdownData?.map((column, colIndex) => (
                                        <div key={`desktop-col-${colIndex}`}>
                                            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-300">
                                                {column.heading}
                                            </h3>
                                            <ul className="list-none p-0 m-0 space-y-2">
                                                {column.links.map((link, linkIndex) => (
                                                    <li key={`desktop-link-${colIndex}-${linkIndex}`}>
                                                        <Link 
                                                            href={link.href} 
                                                            className="block text-sm text-neutral-400 hover:text-white transition-colors no-underline"
                                                        >
                                                            {link.text}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu-overlay"
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) toggleMobileMenu();
                        }}
                    >
                        <motion.div
                            key="mobile-menu-content"
                            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#111111] border-l border-neutral-800 p-6 text-white overflow-y-auto flex flex-col justify-between"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                                    <span className="font-extrabold tracking-wider">✦ HYVIA</span>
                                    <button className="text-neutral-400 hover:text-white" onClick={toggleMobileMenu} aria-label="Close menu">
                                        ✕
                                    </button>
                                </div>

                                <ul className="list-none p-0 m-0 mt-6 flex flex-col gap-3">
                                    {menuItems.map((item, index) => (
                                        <li key={`mobile-menu-${index}`}>
                                            {item.dropdownData ? (
                                                <>
                                                    <button
                                                        className="flex justify-between items-center w-full text-left font-medium py-2 text-neutral-200"
                                                        onClick={() => toggleMobileDropdown(index)}
                                                    >
                                                        {item.label}
                                                        <span className={`text-xs transition-transform duration-200 ${mobileActiveDropdownIndex === index ? 'rotate-180' : ''}`}>
                                                            ▼
                                                        </span>
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileActiveDropdownIndex === index && (
                                                            <motion.div
                                                                initial="closed"
                                                                animate="open"
                                                                exit="closed"
                                                                variants={mobileDropdownVariants}
                                                                className="pl-4 mt-1 border-l border-neutral-800"
                                                            >
                                                                {item.dropdownData.map((column, colIndex) => (
                                                                    <div key={`mobile-col-${colIndex}`} className="my-2">
                                                                        <span className="text-[11px] font-semibold text-neutral-500 uppercase">{column.heading}</span>
                                                                        <ul className="list-none p-0 mt-1 space-y-1">
                                                                            {column.links.map((link, linkIndex) => (
                                                                                <li key={`mobile-link-${colIndex}-${linkIndex}`}>
                                                                                    <Link href={link.href} className="block py-1 text-xs text-neutral-400 hover:text-white" onClick={handleMobileLinkClick}>
                                                                                        {link.text}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link href={item.href} className="block font-medium py-2 text-neutral-200" onClick={handleMobileLinkClick}>
                                                    {item.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
                                <Link href="/cart" className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-900 text-sm font-medium text-white" onClick={handleMobileLinkClick}>
                                    🛒 Cart (0)
                                </Link>
                                <Link href="/login" className="text-center py-2 text-sm text-neutral-300" onClick={handleMobileLinkClick}>
                                    Sign In
                                </Link>
                                <Link href="/register" className="text-center py-2.5 rounded-full bg-white text-black font-semibold text-sm" onClick={handleMobileLinkClick}>
                                    Join Now
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
