'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { SiteHeader } from '@/components/site-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock function to get users. In a real app, this would be a secure admin backend call.
async function getMockUsers(): Promise<User[]> {
  // This is a placeholder. Firebase client-sdk cannot list users.
  // This simulates fetching users you've created.
  console.warn("Displaying only the current user. Listing all users requires a backend with the Firebase Admin SDK.");
  const auth = getAuth();
  if (auth.currentUser) {
    return [auth.currentUser];
  }
  return [];
}

const newUserSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
type NewUserFormValues = z.infer<typeof newUserSchema>;


export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isUserListLoading, setIsUserListLoading] = useState(true);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
  });

  useEffect(() => {
    if (!isUserLoading) {
      if (!user || user.email !== 'admin@example.com') {
        router.push('/login');
      } else {
        fetchUsers();
      }
    }
  }, [user, isUserLoading, router]);

  const fetchUsers = async () => {
    setIsUserListLoading(true);
    // In a real app, you'd fetch users from your backend.
    // For now, we'll just show the currently logged in admin.
    const mockUsers = await getMockUsers();
    setUsers(mockUsers);
    setIsUserListLoading(false);
  };

  const handleCreateUser = async (data: NewUserFormValues) => {
    setIsCreatingUser(true);
    const auth = getAuth();
    const adminUser = auth.currentUser;

    if (!adminUser || !adminUser.email) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Admin user is not properly signed in.',
      });
      setIsCreatingUser(false);
      router.push('/login');
      return;
    }
  
    // Store admin credentials before creating a new user
    const adminEmail = adminUser.email;
    const adminPassword = 'admin'; // As per your instruction
    const newUserEmail = `${data.username}@example.com`;
  
    try {
      // 1. Create the new user. This will sign out the admin and sign in the new user.
      await createUserWithEmailAndPassword(auth, newUserEmail, data.password);
      toast({
        title: 'User Created',
        description: `Successfully created user: ${data.username}`,
      });
  
      // 2. IMPORTANT: Re-authenticate as the admin user.
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
  
      // 3. Refresh the user list and reset the form.
      await fetchUsers();
      reset();
  
    } catch (error: any) {
      console.error('Create User Error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Create User',
        description: error.message || 'An unknown error occurred.',
      });
       // In case of an error, try to restore the admin session.
      if (!auth.currentUser || auth.currentUser.email !== adminEmail) {
        try {
          await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        } catch (reauthError) {
          console.error('Admin re-authentication failed:', reauthError);
          router.push('/login'); // Force re-login if re-authentication fails
        }
      }
    } finally {
      setIsCreatingUser(false);
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="w-full max-w-4xl space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center p-4 md:p-6">
        <h2 className="text-3xl font-bold mb-6 text-gradient-rainbow" data-text="Admin Dashboard">
          Admin Dashboard
        </h2>
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New User</CardTitle>
              <CardDescription>Add a new user account to the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleCreateUser)} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" {...register('username')} disabled={isCreatingUser} />
                  {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register('password')} disabled={isCreatingUser} />
                  {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full btn-hover-pop" disabled={isCreatingUser}>
                  {isCreatingUser ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>
                List of all users. Full user management requires a secure backend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isUserListLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                <ul className="space-y-2">
                  {users.map((u) => (
                    <li key={u.uid} className="flex justify-between items-center p-2 border rounded-lg">
                      <span>{u.email?.split('@')[0]}</span>
                      <span className="text-xs text-muted-foreground">{u.uid}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
