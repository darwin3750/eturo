import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

import { topicCollection } from '../../firebase'
import { commentConverter } from './comment'
import { appleConverter } from './apple'

class PostModel {
  constructor(id, topic, title, body, createdAt, createdBy) {
    this.topic = topic
    this.id = id
    this.title = title
    this.body = body 
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
  }

  async getAllComments() {
    const querySnapshot = await topicCollection.doc(this.topic.id).collection('posts')
      .doc(this.id).collection('comments').withConverter(commentConverter).get()
    return querySnapshot.docs.map(doc => doc.data())
  }

  async addComment(comment) {
    return await topicCollection.doc(this.topic.id).collection('posts')
      .doc(this.id).collection('comments').add(commentConverter.toFirestore(comment))
      .then(commentRef => commentRef.withConverter(commentConverter).get()
      .then(snapshot => snapshot.data()))
      .catch(error => error)
  }

  async destroyComment(commentId) {
    try {
      await topicCollection.doc(this.topic.id).collection('posts')
        .doc(this.id).collection('comments').doc(commentId).delete()
    } catch(error) {
      return false
    }
    return true
  }

  async addApple(apple) {
    try {
      const x = await topicCollection.doc(this.topic.id).collection('posts').doc(this.id)
        .collection('apples').add(appleConverter.toFirestore(apple))
      const get = await x.withConverter(appleConverter).get()
      const data = get.data()
      return data
    } catch(error) {
      return false
    }
  }

  async getAllApples() {
    const apples = await topicCollection.doc(this.topic.id).collection('posts')
      .doc(this.id).collection('apples').withConverter(appleConverter).get()
    return apples.docs.map(apple => apple.data())
  }
}

const postConverter = {
  toFirestore: function(post) {
    return {
      topic: post.topic,
      title: post.title,
      body: post. body,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: post.createdBy,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new PostModel (snapshot.id, data.topic, data.title, data. body, data.createdAt, data.createdBy)
  }
}

export {
  PostModel ,
  postConverter,
}
