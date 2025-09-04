import { checkRole } from './checkRole'
import { Access } from 'payload'

const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
  }
  return false
}

export default editor
