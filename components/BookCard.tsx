import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'

const BookCard = ({ id, title, genre, cover, isLoadingBook = false,

}: Book) => <li className={cn(isLoadingBook && "xs:w-52 w-full")}>
        <Link href={`/books/${id}`} className={cn(isLoadingBook && 'w-full flex flex-col items-center ')}>
            <BookCover coverColor={cover} coverImage={cover} />


            <div className={cn('mt-4',!isLoadingBook && "xs:max-w-40 max-w-28")}>
                <p className='book-title'>{title}</p>
                <p className='book-genre'>{genre}</p>
            </div>

        </Link>
    </li>






export default BookCard