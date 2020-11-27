import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

class UserModel {
  constructor(id, displayName, email, createdAt) {
    this.id = id
    this.displayName = displayName
    this.email = email
    this.createdAt = moment(createdAt).calendar()
  }

  toString() {
    `${this.displayName} => ${this.email}`
  }
}

const userConverter = {
  toFirestore: function(user) {
    return {
      displayName: user.displayName,
      email: user.email,
      createdAt: firebase.firestore.Timestamp.now(),
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new UserModel(snapshot.id, data.displayName, data.email, data.createdAt)
  }
}

export {
  UserModel,
  userConverter,
}
