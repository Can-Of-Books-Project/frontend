import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

import { withAuth0 } from '@auth0/auth0-react'
import { CreateUser, getUserBooks } from './API/books_api'

import BookCard from './components/BookCard';
import BookFormModal from './components/BookFormModal';

import { deleteBook } from './API/books_api'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: ""
    }
  }

  componentDidMount() {
    const accountEnfo = this.props.auth0.user;
    const { name, email } = accountEnfo
    CreateUser(name, email).then((info) => {
      getUserBooks(email).then(data => {
        this.setState({ books: data, email: email })
      })
    })
  }

  handelNewData = books => {
    console.log(books)
    this.setState({ books: books })
    this.setState({refresh: null})

  }

  delBook = id => {
    deleteBook(id)
    getUserBooks(this.state.email).then(data => {
      this.setState({ books: data })
      this.setState({refresh: null})
    })
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <div class="alert alert-danger" role="alert">
          Book was Deleted successfully
        </div>

        <div class="alert alert-success" role="alert">
          new Book was Added successfully
        </div>

        <div className='d-flex flex-row'>
          {this.state.books &&

            this.state.books.map((book, id) =>
              <div className='p-4' key={id}>
                <BookCard book={book} delBook={this.delBook} />
              </div>
            )}
        </div>
        <BookFormModal text="Add" email={this.state.email} handelNewData={this.handelNewData} />

      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
