import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'
import { userCollection } from '../../firebase'
import { userConverter } from './user'

class ModeratorModel {
  constructor(id, user, role, createdAt) {
    this.id = id
    this.user = user
    this.role = role
    this.createdAt = moment(createdAt.toDate()).calendar()
  }

  async toString() {
    return await userCollection.doc(this.user).withConverter(userConverter).get().then(snapshot => {
      const user = snapshot.data()
      return `${user.displayName} | ${this.role}`
    })
  }

}

const ROLES = {
  owner: 0,
  editor: 1,
}

const moderatorConverter = {
  toFirestore: function(mod) {
    return {
      user: mod.user,
      role: mod.role,
      createdAt: firebase.firestore.Timestamp.now(),
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new ModeratorModel(snapshot.id, data.user, data.role, data.createdAt)
  }
}

export {
  ModeratorModel,
  moderatorConverter,
  ROLES,
}
