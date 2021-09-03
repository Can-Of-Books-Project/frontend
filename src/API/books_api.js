import axios from 'axios'
const API_URL = process.env.API_URL || 'http://localhost:3030'


export async function getUserBooks(email) {
    const url = API_URL + '/api/booksByEmail';
    return axios.post(url, {authorEmail:email}).then(response => response.data )
}

export async function CreateUser(name, email) {
    const url = API_URL + '/api/addUser';
    axios.post(url, {name:name, email:email}).then(data => {
    }).catch(error => {
        alert("Ops .. Something Wrong Occurce")
        console.log(error)
    })
}

export async function addBook(title, description, status, img, email) {
    const url = API_URL + '/api/addBook';
    axios.post(url, {title:title, description:description, status:status, img:img, email:email}).catch(error => {
        alert("Ops .. Something Wrong Occurce")
        console.log(error)
    })

}


export async function deleteBook(id) {
    const url = API_URL + '/api/delete/' + id.toString();
    axios.post(url).catch(error => {
        alert("Ops .. Something Wrong Occurce")
        console.log(error)
    })

}

// '/update/:id'

export async function updateBook(title, description, status, img, email, id) {
    const url = API_URL + '/api/update/' + id.toString();
    axios.post(url, {title:title, description:description, status:status, img:img, email:email}).catch(error => {
        alert("Ops .. Something Wrong Occurce")
        console.log(error)
    })
}