import axios from 'axios'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


export async function getUserBooks(email) {
    const url = REACT_APP_API_URL + '/api/booksByEmail';
    return await axios.post(url, { authorEmail: email }).then(response => response.data)
}

export async function CreateUser(name, email) {
    const url = REACT_APP_API_URL + '/api/addUser';
    await axios.post(url, { name: name, email: email }).then(data => {
    }).catch(error => {
        alert("Ops .. Something Wrong Occurce while adding new user")
        // console.log(error)
    })
}

export async function addBook(title, description, status, img, email) {
    const url = REACT_APP_API_URL + '/api/addBook';
    await axios.post(url, { title: title, description: description, status: status, img: img, email: email }).catch(error => {
        alert("Ops .. Something Wrong Occurce while adding new books")
        // console.log(error)
    })
}


export async function deleteBook(id) {
    const url = REACT_APP_API_URL + '/api/delete/' + id.toString();
    await axios.post(url).catch(error => {
        alert("Ops .. Something Wrong Occurce while deleting")
        // console.log(error)
    })
}


export async function updateBook(title, description, status, img, pk) {
    const url = REACT_APP_API_URL + '/api/update/' + pk.toString();
    await axios.post(url, { title: title, description: description, status: status, img: img }).catch(error => {
        alert("Ops .. Something Wrong Occurce while updating")
        // console.log(error)
    })
}