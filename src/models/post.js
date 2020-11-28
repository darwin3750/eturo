import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

class PostModel {
  constructor(id, title, body, createdAt, createdBy) {
    this.id = id
    this.title = title
    this.body = body 
    this.createdAt = moment(createdAt).calendar()
    this.createdBy = createdBy
  }
}

const postConverter = {
  toFirestore: function(topic) {
    return {
      title: topic.title,
      body: topic. body,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: topic.createdBy,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new PostModel (snapshot.id, data.title, data. body, data.createdAt, data.createdBy)
  }
}

export {
  PostModel ,
  postConverter,
}
