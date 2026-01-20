"use client"

import styles from './BookForm.module.scss'
import { useState, useRef } from "react"
import { useAppDispatch } from '@/lib/hooks'
import { addBook } from '@/lib/features/books/booksSlice'

export default function BookForm() {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState('')
  const [useUrl, setUseUrl] = useState(false)
  const [missingName, setMissingName] = useState(false)

  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX = 300

  function resetInputs() {
    setName('')
    setAuthor('')
    setDescription('')
    setPhoto('')
    setUseUrl(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleAddBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name) {
      setMissingName(true)
      return
    }

    const newBook = {
      id: `${name}-${Date.now()}-${Math.random()}`,
      name,
      author,
      description,
      photo
    }

    dispatch(addBook(newBook))
    resetInputs()
    setMissingName(false)
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputType = e.target.type

    if (inputType === "file") {
      const file = e.target.files?.[0]
      if (!file) return

      // Create a new FileReader to read the file content
      const reader = new FileReader()

      // Set up what happens when the reading is done
      reader.onloadend = () => {
        // reader.result contains the Base64 string
        const base64String = reader.result as string
        setPhoto(base64String)
      }

      // Start reading the file as a Data URL (Base64)
      reader.readAsDataURL(file)
    } else if (inputType === "text") {
      setPhoto(e.target.value)
    }
  }

  function triggerUseURL() {
    setUseUrl(!useUrl)
    setPhoto('')
  }


  return (
    <div className="sharedBox fix">
      <h2><strong>Add your favourite book</strong></h2>
      {missingName && <p className={styles.errorMessage}>Please enter a name.</p>}
      <form id="book-form" onSubmit={handleAddBook} className={styles.form}>
        <div>
          <p>Name</p>
          <input type="text" placeholder="Harry Potter and the Philosopher's Stone" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Author</p>
          <input type="text" placeholder="J.K. Rowling" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <div className={styles.descriptionHeader}>
            <p>Description</p>
            <div>{description.length}/{MAX}</div>
          </div>
          <textarea placeholder="Story about a boy..." value={description} onChange={(e) => setDescription(e.target.value)} maxLength={MAX} />
        </div>
        <div>
          <div className={styles.photoHeader}>
            <p>Photo</p>
            <p className={styles.URLvsFile} onClick={triggerUseURL}>{useUrl ? 'Upload file' : 'Use URL'}</p>
          </div>
          {!useUrl ? (
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => handlePhotoChange(e)}
              ref={fileInputRef}
            />
          ) : (
            <input type="text" placeholder="Photo URL" onChange={(e) => handlePhotoChange(e)} />
          )}
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}