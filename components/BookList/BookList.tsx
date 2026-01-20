"use client"

import styles from './BookList.module.scss'
import { Book } from "@/lib/features/books/booksSlice"
import { useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import BookModal from "../BookModal/BookModal"

export default function BookList() {
  const books = useAppSelector((state) => state.books)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <BookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.modalImageWrapper}>
            {selectedBook?.photo ? <img src={selectedBook?.photo} alt={selectedBook?.name} /> : <p>No image</p>}
          </div>
          <div className={styles.modalInfo}>
            <h2>{selectedBook?.name}</h2>
            <p><i><strong>Author</strong></i> - {selectedBook?.author ? selectedBook?.author : "No author"}</p>
            <p><i><strong>Description</strong></i> - {selectedBook?.description ? selectedBook?.description : "No description"}</p>
          </div>
        </div>
      </BookModal>

      <div className="sharedBox">
        <h2 className={styles.title}><strong>Books</strong></h2>
        <input
          type="text"
          placeholder="Search books..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.bookList}>
          {filteredBooks.length > 0 ? filteredBooks.map((book) => (
            <button className={styles.book} key={book.id} onClick={() => {
              setSelectedBook(book)
              setIsModalOpen(true)
            }}>
              {book.name}
            </button>
          )) : <p>No books found</p>}
        </div>
      </div>
    </>
  )
}