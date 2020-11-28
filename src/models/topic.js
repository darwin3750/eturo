import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

import { topicCollection } from '../../firebase'
import { postConverter } from './post'

class TopicModel {
  constructor(id, title, description, createdAt, createdBy) {
    this.id = id
    this.title = title
    this.description = description
    this.createdAt = moment(createdAt.toDate()).calendar()
    this.createdBy = createdBy
    this.reference = topicCollection.doc(this.id)
  }

  // checks if a user is a moderator of this topic
  async isModerator(userRef) {
    return await this.reference.collection('moderators')
      .where('user', '==', userRef).get().then(x => !x.empty)
  }

  async addPost(post) {
    return await this.reference.collection('posts').add(postConverter.toFirestore(post))
      .then(postRef => postRef.withConverter(postConverter).get().then(snapshot => snapshot.data()))
      .catch(error => error)
  }

  async allPosts() {
    this.posts = []
    const querySnapshot = await this.reference.collection('posts').withConverter(postConverter).get()
    querySnapshot.forEach(snapshot => this.posts.push(snapshot.data()))
    return this.posts
  }

}

const topicSlugGenerator = (string) => {
  const wordArr = string.split(" ").map(word => word.toLowerCase().trim())
  const filtered = wordArr.map(word => {
    return word.replace(/[^a-zA-Z0-9]/g, "")
  })
  return filtered.join("-")
}

const topicConverter = {
  toFirestore: function(topic) {
    return {
      title: topic.title,
      description: topic.description,
      createdAt: firebase.firestore.Timestamp.now(),
      createdBy: topic.createdBy,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options)
    return new TopicModel(snapshot.id, data.title, data.description, data.createdAt, data.createdBy)
  }
}

export {
  TopicModel,
  topicConverter,
  topicSlugGenerator,
}
