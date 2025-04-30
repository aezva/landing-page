'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  image: string | null;
}

interface UserContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 