const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ( (notification) => {
   return admin.firestore()
       .collection('notifications')
       .add(notification)
       .then( doc => console.log('notification added', doc));
});

exports.projectCreated = functions.firestore
    .document('projects/{ptojectId}')
    .onCreate( doc => {
        const project = doc.data();
        const notification = {
            action: 'added a new',
            content: 'post',
            user: project.author,
            userId: project.authorId,
            projectId: doc.id,
            time: admin.firestore.FieldValue.serverTimestamp()
        };
        return createNotification(notification);
});

exports.userJoined = functions.auth
    .user()
    .onCreate( user => {
        return admin.firestore().collection('users')
            .doc(user.uid)
            .get()
            .then( doc => {
                const newUser = doc.data();
                const notification = {
                    action: 'joined the',
                    content: 'party',
                    user: `${ newUser.firstName } ${ newUser.lastName }`,
                    userId: user.uid,
                    time: admin.firestore.FieldValue.serverTimestamp()
                };

                return createNotification(notification);
            });
});
