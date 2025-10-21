import { AuthError } from "firebase/auth";

type FirestoreOperation = 'list' | 'get' | 'create' | 'update' | 'delete' | 'write' | 'read';
type AuthOperation = 'signin' | 'signup' | 'signout' | 'link';

interface BaseErrorParams {
  message?: string;
  cause?: unknown;
}

interface FirestoreErrorParams extends BaseErrorParams {
  operation: FirestoreOperation;
  path: string;
  requestResourceData?: any;
}

interface AuthErrorParams extends BaseErrorParams {
  operation: AuthOperation;
  providerId: string; // e.g., 'password', 'google.com'
  email?: string;
  authError?: AuthError;
}

/**
 * Custom error class for Firestore permission issues.
 * This helps distinguish permission errors from other Firestore or application errors.
 */
export class FirestorePermissionError extends Error {
  public operation: FirestoreOperation;
  public path: string;
  public requestResourceData?: any;

  constructor({ operation, path, requestResourceData, message, cause }: FirestoreErrorParams) {
    const defaultMessage = `Permission denied for '${operation}' on path '${path}'.`;
    super(message || defaultMessage, { cause });
    this.name = 'FirestorePermissionError';
    this.operation = operation;
    this.path = path;
    this.requestResourceData = requestResourceData;
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}

/**
 * Custom error class for Authentication permission issues.
 * This provides more context about the failed authentication operation.
 */
export class AuthPermissionError extends Error {
  public operation: AuthOperation;
  public providerId: string;
  public email?: string;
  public authError?: AuthError;

  constructor({ operation, providerId, email, authError, message, cause }: AuthErrorParams) {
    const defaultMessage = `Authentication failed during '${operation}' with provider '${providerId}'.`;
    super(message || defaultMessage, { cause: cause || authError });
    this.name = 'AuthPermissionError';
    this.operation = operation;
    this.providerId = providerId;
    this.email = email;
    this.authError = authError;
    Object.setPrototypeOf(this, AuthPermissionError.prototype);
  }
}
