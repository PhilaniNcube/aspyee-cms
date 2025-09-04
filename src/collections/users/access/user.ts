import { checkRole } from './checkRole'
import { Access } from 'payload'

const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
    return { id: { equals: user?.id } }
  }
  return false
}

export default user
