import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { Form, QuestionnaireData } from '@types';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// init app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export const getForm = async (id: string) => {
  let form: any = null;

  const formRef = collection(db, 'forms');
  const questionRef = collection(formRef, id, 'questions');

  try {
    const formSnapshot = await getDocs(formRef);
    const questionsSnapshot = await getDocs(questionRef);

    formSnapshot.docs.forEach((doc) => {
      if (doc.id === id) {
        form = doc.data();
        form.expired_date = {
          seconds: form.expired_date.seconds,
          nanoseconds: form.expired_date.nanoseconds,
        };
      }
    });

    questionsSnapshot.docs.forEach((doc) => {
      if (!form.questions) {
        form.questions = {
          [doc.id]: doc.data(),
        };
        return;
      }
      form.questions[doc.id] = doc.data();
    });

    return form as Form;
  } catch (err) {
    console.error(`firebase error: ${err}`);
  }
};

export const createSurveyData = async (
  data: QuestionnaireData[],
  formId: string
) => {
  const surveyDataRef = await collection(db, 'forms', formId, 'survey_data');

  try {
    const docRef = await addDoc(surveyDataRef, { data });
    return docRef.id;
  } catch (err) {
    console.error(`firebase error: ${err}`);
  }
};
