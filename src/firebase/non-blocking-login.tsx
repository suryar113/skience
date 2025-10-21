'use client';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { AuthError } from 'firebase/auth';
import { AuthPermissionError } from '@/firebase/errors';

/**
 * Initiates a non-blocking sign-in with email and password.
 * The operation is performed without awaiting its completion, allowing UI to remain responsive.
 * Errors are caught and emitted globally for centralized handling.
 */
export function initiateEmailSignIn(auth: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(auth, email, password)
    .catch((error: AuthError) => {
      // Emit a structured authentication error for global listeners
      errorEmitter.emit('permission-error', new AuthPermissionError({
        operation: 'signin',
        providerId: 'password', // Indicates email/password authentication
        email: email, // Include the email for context
        authError: error,
      }));
    });
}

/**
 * Initiates a non-blocking sign-up with email and password.
 * The operation is performed without awaiting its completion.
 * Errors are caught and emitted for global handling.
 */
export function initiateEmailSignUp(auth: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(auth, email, password)
    .catch((error: AuthError) => {
      // Emit a structured authentication error
      errorEmitter.emit('permission-error', new AuthPermissionError({
        operation: 'signup',
        providerId: 'password',
        email: email,
        authError: error,
      }));
    });
}
