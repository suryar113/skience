'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquarePlus, 
  Send, 
  X, 
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function FeedbackNudge() {
  const db = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialNudge, setShowInitialNudge] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show the initial nudge bubble after 3 seconds
    const timer = setTimeout(() => {
      if (!isOpen && !isSubmitted) {
        setShowInitialNudge(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, isSubmitted]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setShowInitialNudge(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const feedbackData = {
      message: message.trim(),
      submitterEmail: email.trim() || user?.email || 'anonymous',
      userId: user?.uid || null,
      submittedAt: new Date().toISOString(),
      createdAt: serverTimestamp(),
    };

    try {
      const feedbackRef = collection(db, 'feedback');
      await addDoc(feedbackRef, feedbackData);
      
      setIsSubmitted(true);
      setMessage('');
      setEmail('');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 3000);

    } catch (error: any) {
      const permissionError = new FirestorePermissionError({
        path: 'feedback',
        operation: 'create',
        requestResourceData: feedbackData,
      });
      errorEmitter.emit('permission-error', permissionError);
      
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Your feedback couldn't be sent right now. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Auto-appearing Nudge Bubble */}
      <AnimatePresence>
        {showInitialNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.9, x: 20 }}
            className="mb-2 relative"
          >
            <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl shadow-2xl max-w-[180px] relative overflow-hidden group">
              {/* Scanline effect inside the nudge */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] z-0" />
              
              <button 
                onClick={() => setShowInitialNudge(false)}
                className="absolute top-1 right-1 p-1 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
              
              <div className="relative z-10 pr-4">
                <p className="text-[11px] font-body text-foreground leading-tight">
                  Help us improve.
                </p>
              </div>
              
              {/* Animated corner accent */}
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500/50 rounded-br-lg" />
            </div>
            {/* Little arrow pointing down to the button */}
            <div className="absolute -bottom-1 right-6 w-3 h-3 bg-black/60 border-r border-b border-white/10 rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>

      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 p-0 bg-background/5 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(122,0,255,0.2)] hover:shadow-[0_0_30px_rgba(122,0,255,0.4)] hover:scale-110 transition-all duration-300 group"
          >
            <MessageSquarePlus className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
            <span className="sr-only">Feedback</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          side="top" 
          align="end" 
          className="w-80 p-0 overflow-hidden bg-black/60 backdrop-blur-2xl border-white/10 rounded-[21px] shadow-2xl"
        >
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-headline tracking-wider text-foreground">SYSTEM FEEDBACK</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-white/10" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-1">Help us improve the experience.</p>
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-6 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Message Transmitted</h4>
                    <p className="text-sm text-muted-foreground mt-1">Thank you for your report.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-headline tracking-widest text-muted-foreground">CONTACT (OPTIONAL)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 focus:border-purple-500/50 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-headline tracking-widest text-muted-foreground">REPORT DATA</Label>
                    <Textarea
                      id="message"
                      placeholder="What's on your mind?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-[100px] bg-white/5 border-white/10 focus:border-purple-500/50 rounded-xl resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !message.trim()} 
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-xl h-11 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        SEND DATA
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}