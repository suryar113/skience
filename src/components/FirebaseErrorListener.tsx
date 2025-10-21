'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { AuthPermissionError, FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError | AuthPermissionError) => {
      let title = 'Error';
      let description = 'An unknown error occurred.';

      if (error instanceof FirestorePermissionError) {
        title = 'Firestore Permission Denied';
        description = `You do not have permission to ${error.operation} at ${error.path}. Please check your Firestore security rules.`;
      } else if (error instanceof AuthPermissionError) {
        title = 'Authentication Error';
        description = `Failed to ${error.operation}. Please check your credentials or network connection.`;
        // Example of more specific auth error handling
        if (error.authError?.code === 'auth/wrong-password' || error.authError?.code === 'auth/user-not-found') {
          description = 'Invalid email or password.';
        } else if (error.authError?.code === 'auth/email-already-in-use') {
          description = 'An account with this email already exists.';
        }
      }

      toast({
        variant: 'destructive',
        title: title,
        description: description,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null; // This component does not render anything
}
