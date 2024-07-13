import create from "zustand";

const useStore = create((set) => ({
  profile: null,
  setProfile: (profileData) => set({ profile: profileData }),
}));

export default useStore;
