import { checkRole } from './checkRole'
import { Access } from 'payload'

const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }
  return false
}

export default admin
