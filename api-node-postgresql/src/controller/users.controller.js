import { pool } from '../database.js'

export const getAllUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users')
  res.json(rows)
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`)
  if (rows.length === 0) {
    res.status(404).json({ message: 'User not found' })
  } else res.json(rows[0])
}

export const addUser = async (req, res) => {
  try {
    const params = req.body
    const { rows } = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [params.name, params.email])
    return res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const editUser = async (req, res) => {
  const { id } = req.params
  const params = req.body

  const { rowCount } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [params.name, params.email, id])

  if (rowCount !== 1) {
    res.sendStatus(304)
  } else res.sendStatus(200)
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  const { rowCount } = await pool.query(`DELETE FROM users WHERE id = ${id}`)
  if (rowCount !== 1) {
    res.status(404).json({ message: 'User not found' })
  } else res.sendStatus(204)
}
