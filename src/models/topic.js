import firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../../firebase'
import moment from 'moment'

class TopicModel {
  constructor(id, title, description, createdAt, createdBy) {
    this.id = id
    this.title = title
    this.description = description
    this.createdAt = moment(createdAt).calendar()
    this.createdBy = 'me'
  }

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
}
