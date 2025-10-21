'use client';

import { useState, useEffect } from 'react';
import {
  doc,
  onSnapshot,
  DocumentReference,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useFirestore } from '@/firebase';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDocument hook.
 * @template T Type of the document data.
 */
export interface UseDocumentResult<T> {
  data: WithId<T> | null;
  isLoading: boolean;
  error: FirestoreError | null;
}

/**
 * React hook to subscribe to a Firestore document in real-time.
 * It gracefully handles cases where the document reference might be null or undefined.
 *
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedDocRef or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *
 * @template T The expected type of the document data.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef - The Firestore document reference
 * to subscribe to. If null or undefined, the hook will not fetch data.
 * @returns {UseDocumentResult<T>} An object containing the document data, loading state, and error state.
 */
export function useDocument<T = any>(
  memoizedDocRef: (DocumentReference<DocumentData> & {__memo?: boolean}) | null | undefined
): UseDocumentResult<T> {
  const [data, setData] = useState<WithId<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    // If the document reference is not provided, reset state and do nothing.
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          // Document exists, update data state.
          setData({ ...(snapshot.data() as T), id: snapshot.id });
          setError(null);
        } else {
          // Document does not exist.
          setData(null);
          // Not necessarily an error, so we don't set error state here.
          // Could be handled as a specific case in the component.
        }
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        // Handle errors, including permission denied.
        setError(err);
        const contextualError = new FirestorePermissionError({
          operation: 'read',
          path: memoizedDocRef.path,
        });
        errorEmitter.emit('permission-error', contextualError);
        setData(null);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on component unmount or when docRef changes.
    return () => unsubscribe();
  }, [memoizedDocRef]); // Dependency array ensures effect re-runs if docRef changes.

  if(memoizedDocRef && !memoizedDocRef.__memo) {
    throw new Error(memoizedDocRef.path + ' was not properly memoized using useMemoFirebase');
  }

  return { data, isLoading, error };
}
