'use client'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="my-5 flex items-center justify-between px-4 sm:px-10">
      {/* Logo */}
      <Link href="/">
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
          <Image src="/icons/logo.svg" alt="logo" fill className="object-contain" />
        </div>
      </Link>

      {/* Navigation */}
      <ul className="flex flex-row items-center gap-3 sm:gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              'text-sm sm:text-base cursor-pointer capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100'
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
