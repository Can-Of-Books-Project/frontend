import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { Card, Button,Row } from 'react-bootstrap';


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
      email: "",
      status: "",
      showStatus: false
    }
  }

  showStatusActive() {
    let style, content
    switch (this.state.status) {
      case 'delete':
        style = "alert alert-danger";
        content = "Deleted";
        break;

      case 'Add':
        style = "alert alert-success";
        content = "Added";
        break;

      case 'Update':
        style = "alert alert-success";
        content = "Update";
        break;

      default:

    }

    return <div className={style} role="alert"> Book was {content} successfully </div>
  }

  componentDidMount() {
    const accountEnfo = this.props.auth0.user;
    const { name, email } = accountEnfo
    CreateUser(name, email).then(() => {
      getUserBooks(email).then(data => {
        this.setState({ books: data, email: email })
      })
    })
  }

  handelNewData = books => {
    this.setState({ books: books })
    this.setState({ showStatus: true, status: "Add" })

    setTimeout(() => {
      this.setState({ showStatus: false, status: "" })
    }, 3000);
    // this.setState({refresh: null})
  }

  delBook = pk => {
    let conf = window.confirm("Are you sure");
    if (conf) {
      deleteBook(pk)
      getUserBooks(this.state.email).then(data => {
        this.setState({ books: data })
        this.setState({ showStatus: true, status: "delete" })

        setTimeout(() => {
          this.setState({ showStatus: false, status: "" })
        }, 3000);
        // this.setState({refresh: null})
      })


    } else {
      return
    }
  }

  render() {
    return (
      <Jumbotron>

        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {/* add button */}
        <BookFormModal type="Add" email={this.state.email} handelNewData={this.handelNewData} />
        <br />
        {this.state.showStatus &&
          this.showStatusActive()
        }
        <br />

        {this.state.books &&

          <Row xs={1} md={3} className="g-4">
            {this.state.books.map((book, idx) => (
              <div className='p-4' key={idx}>
                <BookCard book={book} delBook={this.delBook} handelNewData={this.handelNewData} />
              </div>
            ))
            }

          </Row>
        }
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
