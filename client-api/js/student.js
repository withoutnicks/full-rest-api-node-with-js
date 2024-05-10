import { URL_API, URL_AVATAR, CONTAINER } from './config'

/**
 * Print students in the document
 * @param {Array} students List the students from API
 */
export const listAllStudents = (students) => {
  students.forEach(student => {
    createCard(student, CONTAINER)
  })
}

/**
 * Add student to database and refresh page
 * @param {String} name Full name the student
 * @param {String} email Example email for the student
 */
export const addStudent = (name, email) => {
  name = document.querySelector('#txtName').value
  email = document.querySelector('#txtEmail').value

  if (name && email) {
    const data = {
      name,
      email
    }

    fetch(URL_API + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(student => {
        const $card = createCard(student, CONTAINER)
        CONTAINER.appendChild($card)
      })
      .catch(err => console.log(err))

    window.location.reload()
  }
}

/**
 * Edit student
 * @param {String} id Identifier student
 * @param {String} newName Name student
 * @param {String} newEmail Email student
 */
export const editStudent = (id, newName, newEmail) => {
  const data = {
    id,
    name: newName,
    email: newEmail
  }

  fetch(URL_API + 'users/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Student Edit')
      }
    })
    .catch(error => {
      console.error(error)
    })
}

/**
 * Get data a unique student
 * @param {String} id Get info the one student
 * @returns Data the Student
 */
export async function getStudentById (id) {
  try {
    const response = await fetch(URL_API + 'users/' + id)
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

/**
 * Show data the student in inputs
 * @param {Object} student Json with data the student
 */
export function showDataStudent (student) {
  document.getElementById('editName').value = student.name
  document.getElementById('editEmail').value = student.email
}

/**
 * Delete student the database
 * @param {String} id Student identification
 */
export const deleteStudent = (id) => {
  fetch(URL_API + 'users/' + id, {
    method: 'DELETE'
  })
    .then(response => {
      console.log(response.status)
    })
    .catch(error => {
      console.error(error)
    })
}

/**
 * Create card the student
 * @param {Object} student Data the student for view
 * @param {String} container Name the container save card
 */
function createCard (student, container) {
  const $card = document.createElement('article')
  $card.className = 'card'
  $card.dataset.id = student.id
  $card.innerHTML = /* html */` 
      <div>
        <img src="${URL_AVATAR + student.name}" />
        <p>${student.name}</p>
        <small>${student.email}</small>
        <div style="margin-top: 16px">
          <button class="btn ed">edit</button>
          <button class="btn rm">delete</button>
        </div>
      </div>
    `
  container.appendChild($card)
}
