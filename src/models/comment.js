import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

class CommentModel {
  constructor(id, body, createdAt, createdBy) {
    this.id = id
    this.body = body 
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
  }
}

const commentConverter = {
  toFirestore: function(comment) {
    return {
      body: comment. body,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: comment.createdBy,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new CommentModel (snapshot.id, data.body, data.createdAt, data.createdBy)
  }
}

export {
  CommentModel,
  commentConverter,
}

