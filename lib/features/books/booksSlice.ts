import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Book {
  id: string
  name: string
  author: string
  description: string
  photo: string
}

const initialState: Book[] = []

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.push(action.payload)
    },
  },
})

export const { addBook } = booksSlice.actions

export default booksSlice.reducer
