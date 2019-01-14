import admin from 'firebase-admin'
import serviceAccount from 'config/firebase.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export default admin
1
