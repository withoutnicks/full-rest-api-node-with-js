/* CONSTANTS */
import { URL_API, CONTAINER } from './js/config'
import { listAllStudents, addStudent, deleteStudent, editStudent, getStudentById, showDataStudent } from './js/student'

/* 🟢 GET STUDENTS */
document.addEventListener('DOMContentLoaded', () => {
  fetch(URL_API + 'users')
    .then(res => res.json())
    .then(students => listAllStudents(students))
})

/* 🔵 NEW STUDENT */
document.querySelector('#btnAdd').addEventListener('click', addStudent)

/* 🔴 DELETE STUDENT */
document.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.btn.rm')
  if (deleteButton) {
    const card = deleteButton.closest('.card')
    const studentsId = card.dataset.id
    deleteStudent(studentsId)
    card.remove()
  }
})

document.getElementById('editForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const _name = formData.get('editName')
  const _email = formData.get('editEmail')
  const _id = editModal.dataset.studentId

  editStudent(_id, _name, _email)

  editModal.close()
  window.location.reload()
})

/* 🟣 SHOW STUDENT */
const editModal = document.querySelector('#editModal')
CONTAINER.addEventListener('click', async (event) => {
  const editButton = event.target.closest('.btn.ed')
  if (editButton) {
    editModal.showModal()

    const id = editButton.closest('.card').dataset.id
    editModal.dataset.studentId = id
    const student = await getStudentById(id)
    showDataStudent(student)
  }
})

/* 🟣 CLOSE MODAL */
editModal.addEventListener('click', (event) => {
  if (event.target === editModal) {
    editModal.close()
  }
})
