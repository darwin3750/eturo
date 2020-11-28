import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

import { topicCollection } from '../../firebase'
import { commentConverter } from './comment'

class PostModel {
  constructor(id, title, body, createdAt, createdBy) {
    this.id = id
    this.title = title
    this.body = body 
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
  }

  setTopic(topicId) {
    this.topic = topicId
  }

  async getAllComments() {
    const querySnapshot = await topicCollection.doc(this.topic).collection('posts')
      .doc(this.id).collection('comments').withConverter(commentConverter).get()
    return querySnapshot.docs.map(doc => doc.data())
  }

  async addComment(comment) {
    return await topicCollection.doc(this.topic).collection('posts')
      .doc(this.id).collection('comments').add(commentConverter.toFirestore(comment))
      .then(commentRef => commentRef.withConverter(commentConverter).get()
      .then(snapshot => snapshot.data()))
      .catch(error => error)
  }

  async destroyComment(commentId) {
    try {
      await topicCollection.doc(this.topic).collection('posts')
        .doc(this.id).collection('comments').doc(commentId).delete()
    } catch(error) {
      return false
    }
    return true
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
