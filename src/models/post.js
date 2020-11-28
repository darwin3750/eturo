import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

class PostModel {
  constructor(id, title, body, createdAt, createdBy) {
    this.id = id
    this.title = title
    this.body = body 
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
  }

  setTopic(topicRef) {
    this.topic = topicRef
  }
}

const postConverter = {
  toFirestore: function(post) {
    return {
      title: post.title,
      body: post. body,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: post.createdBy,
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
