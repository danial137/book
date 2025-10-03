import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'

const BookCard = ({ id, title, genre, cover, isLoadingBook = false,

}: Book) => <li className={cn(isLoadingBook && "xs:w-52 w-full")}>
        <Link href={`/books/${id}`} className={cn(isLoadingBook && 'w-full flex flex-col items-center ')}>
            <BookCover coverColor={cover} coverImage={cover} />


            <div className={cn('mt-4', !isLoadingBook && "xs:max-w-40 max-w-28")}>
                <p className='book-title'>{title}</p>
                <p className='book-genre'>{genre}</p>
            </div>

            {isLoadingBook && (
                <div className='mt-3 w-full'>
                    <div className='book-loaned'>
                        <Image src='/icons/calendar.svg' height={18} width={18} alt='svg' className='object-contain' />
                        <p className='text-light-100'>11 days left to return</p>
                    </div>
                    <Button className='book-btn'>Download receipt</Button>
                </div>
            )}

        </Link>
    </li>






export default BookCard