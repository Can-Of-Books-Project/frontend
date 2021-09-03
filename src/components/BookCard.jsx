import React from 'react'
import { Card, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';


export default function BookCard({book, delBook, handelNewData}) {
    


    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>
            {book.description}
          </Card.Text>
          <Card.Text>
          {book.status}
          </Card.Text>
          {/* <Button variant="primary">Update</Button>{" "} */}
          <Button onClick={() => delBook(book._id)} variant="danger">Delete</Button>

          {/* Update button */}
          <BookFormModal pk={book._id}  type="update" handelNewData={handelNewData}/>
        </Card.Body>
      </Card>
    )
}
