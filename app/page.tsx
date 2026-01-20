import BookForm from "../components/BookForm/BookForm"
import BookList from "../components/BookList/BookList"

export default function BookLibrary() {
  return (
    <div className="container">
      <BookForm />
      <BookList />
    </div>
  )
}
