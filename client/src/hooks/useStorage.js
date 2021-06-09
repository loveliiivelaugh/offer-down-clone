import { useState, useEffect } from 'react';
import firebase from '../firebase/config';

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


const useStorage = file => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images');

    storageRef.put(file).on('state_changed', ({ bytesTransferred, totalBytes }) => {
      let percentage = (bytesTransferred / totalBytes) * 100;
      setProgress(percentage);
    }, (error) => {
      setError(error);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      collectionRef.add({ url, createdAt });
      setUrl(url);
    })
  }, [file]);

  return { progress, url, error };

};

export default useStorage;