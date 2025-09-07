import React, { createContext, useContext, useState } from 'react';

interface Profile {
  id: string;
  name: string;
  age: number;
  contact: string;
  location: string;
  landSize: string;
  cropType: string;
  soilType: string;
  irrigationMethod: string;
  createdAt: Date;
}

interface ProfileContextType {
  profiles: Profile[];
  addProfile: (profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  updateProfile: (id: string, profile: Omit<Profile, 'id' | 'createdAt'>) => void;
  deleteProfile: (id: string) => void;
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const addProfile = (profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    const newProfile: Profile = {
      ...profileData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setProfiles(prev => [...prev, newProfile]);
    setSelectedProfile(newProfile);
  };

  const updateProfile = (id: string, profileData: Omit<Profile, 'id' | 'createdAt'>) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id 
        ? { ...profile, ...profileData }
        : profile
    ));
    if (selectedProfile?.id === id) {
      setSelectedProfile({ ...selectedProfile, ...profileData });
    }
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, updateProfile, deleteProfile, selectedProfile, setSelectedProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};