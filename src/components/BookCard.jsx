import React from 'react'
import { Card, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';


export default function BookCard({ book, delBook, handelNewData }) {



  return (
      <Card>
      <Card.Img variant="top" src={book.img} style={{height:"389px", width:"389px"}} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.description}
        </Card.Text>
        <Card.Text>
        {book.status}
        </Card.Text>
        <div className="mb-0">
        {/* <Button variant="primary">Update</Button>{" "} */}
        <Button onClick={() => delBook(book._id)} variant="danger">Delete</Button>

        {/* Update button */}
        <BookFormModal pk={book._id}  type="update" handelNewData={handelNewData}/>
        </div>

      </Card.Body>
    </Card>
  )
}
