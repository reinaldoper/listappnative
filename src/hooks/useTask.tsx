import { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, doc, query, orderBy, getDoc, getDocs, where } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Task } from '../types/types';
import { MSG_ERROR_DATES, MSG_ERROR_FIREBASE, MSG_USER_NOT_FOUND } from '../constants/constants';


  /**
   * This hook provides functions to interact with the Firestore database.
   *
   * It also provides a `tasks` state, which is an array of tasks.
   *
   * The `addTask` function adds a new task to the database.
   *
   * The `toggleTaskCompleted` function toggles the `completed` status of a task.
   *
   * The `removeTask` function removes a task from the database.
   *
   * The `createUser` function creates a new user in the database.
   *
   * The `login` function logs a user in and checks if the user exists in the database.
   *
   * @returns {{ tasks: Task[], addTask: (title: string, description?: string) => Promise<void>, toggleTaskCompleted: (id: string, completed: boolean) => Promise<void>, removeTask: (id: string) => Promise<void>, createUser: (email: string, password: string) => Promise<void>, login: (email: string, password: string) => Promise<void> }}
   */
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list: Task[] = [];
      querySnapshot.forEach((docTask) => {
        const data = docTask.data();
        list.push({
          id: docTask.id,
          title: data.title,
          completed: data.completed,
          description: data.description,
          createdAt: data.createdAt.toDate(),
        });
      });
      setTasks(list);
    });

    return () => unsubscribe();
  }, []);

  async function addTask(title: string, description?: string) {
    const user = auth.currentUser;
    if (!user) throw new Error(MSG_USER_NOT_FOUND);
    await addDoc(collection(db, 'tasks'), {
      uid: user.uid,
      title,
      completed: false,
      description,
      createdAt: new Date(),
    });
  }

  async function createUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      throw new Error(MSG_ERROR_FIREBASE);
    }
  }

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error(MSG_ERROR_DATES);
      }     
    } catch (error) {
      throw new Error(MSG_ERROR_FIREBASE);
    }
  }

  async function toggleTaskCompleted(id: string, completed: boolean) {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { completed });
  }

  async function removeTask(id: string) {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  }

  return { tasks, addTask, toggleTaskCompleted, removeTask, createUser, login };
}
