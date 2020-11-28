import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

class AppleModel {
  constructor(id, createdAt, createdBy) {
    this.id = id
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
  }
}

const appleConverter = {
  toFirestore: function(apple) {
    return {
      createdBy: apple.createdBy,
      createdAt: firebase.firestore.Timestamp.now(),
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new AppleModel (snapshot.id, data.createdAt, data.createdBy)
  }
}

export {
  AppleModel,
  appleConverter,
}
