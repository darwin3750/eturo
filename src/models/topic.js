import firebase from 'firebase/app'
import 'firebase/firestore'
import { topicCollection } from '../../firebase'
import moment from 'moment'

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
  isModerator(userRef) {
    let mod = false
    this.reference.collection('moderators')
      .where('user', '==', userRef).get().then(x => {
        mod = !x.empty
      })
    return mod
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
