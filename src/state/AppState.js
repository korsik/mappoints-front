import Cookies from "js-cookie";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: Cookies.get("jwtToken") ? true : false,
  user: sessionStorage.user ? JSON.parse(sessionStorage.user) : "",
  updateIsLoggedIn: (loggedState) => set({ isLoggedIn: loggedState }),
  logOut: () => {
    Cookies.remove("jwtToken");
    sessionStorage.clear();
    set({ isLoggedIn: false });
  },
}));

export const useProfileInStore = create((set) => ({
  toggleProfileInsert: false,
  updateToggleProfileInsert: (toggleState) =>
    set({ toggleProfileInsert: toggleState }),
}));


export const activeBulkEditor = create((set) => ({
  activeBulkEditor: false,
  updateActiveBulkEditor: (toggleState) => set({ activeBulkEditor: toggleState }),
}));


export const useInsertStore = create((set) => ({
  toggleInsert: false,
  updateToggleInsert: (toggleState) => set({ toggleInsert: toggleState }),
}));

export const useSelectCategory = create((set) => ({
  selectCategory: null,
  updateSelectCategory: (swapCategory) => set({ selectCategory: swapCategory }),
}));

export const useEntries = create((set) => ({
  entries: { records: [], npage: 1, numbers: 1 },
  updateEntries: (updatedEntries) => set({ entries: updatedEntries }),
}));

export const useCreateEntry = create((set) => ({
  entry: {
    name: "",
    address: "",
    lat: 0,
    long: 0,
    category: "",
    color: "#ea4335",
    data: [],
  },
  updateEntry: (updatedEntry) => {
    set((state) => ({
      entry: { ...state.entry, ...updatedEntry },
    }));
  },
  reset: () => {
    set((state) => ({
      entry: {
        name: "",
        address: "",
        lat: 0,
        long: 0,
        category: "",
        color: "#ea4335",
        data: [],
      },
    }));
  },

}));

export const useUpdateEntry = create((set) => ({
  entryId: "",
  entryIdToUpdate: (id) => {
    set((state) => ({
      entryId: id,
    }));
  },
}));

export const useEntryInfoWindow = create((set) => ({
  entry: {
    name: "",
    address: "",
    lat: 0,
    long: 0,
    category: "",
    color: "#ea4335",
    data: [],
  },
  isOpen: false,
  setIsOpen: (newState) => set({ isOpen: newState }),
  updateEntry: (updatedEntry) => {
    set((state) => ({
      entry: { ...state.entry, ...updatedEntry },
    }));
  },
  reset: () => {
    set((state) => ({
      entry: {
        name: "",
        address: "",
        lat: 0,
        long: 0,
        category: "",
        color: "#ea4335",
        data: [],
      },
      isOpen: false,
    }));
  },
  
}));

// ==============================================================

export const useCreateUser = create((set) => ({
  user: {
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    role: "",
  },
  updateUser: (updatedUser) => {
    set((state) => ({
      user: { ...state.user, ...updatedUser },
    }));
  },
  reset: () => {
    set((state) => ({
      user: {
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
        role: "",
      },
    }));
  },
}));

export const useUpdateUser = create((set) => ({
  userId: "",
  userIdToUpdate: (id) => {
    set((state) => ({
      userId: id,
    }));
  },
}));

export const useUpdateButton = create((set) => ({
  updateButtonState: false,
  toggleUpdateButtonState: (toggleState) =>
    set({ updateButtonState: toggleState }),
}));


// ==============================================================

export const useCreateProfile = create((set) => ({
  profile: {
    name: "",
    category: "",
    data: [],
    // icon: "",
    color: ""
  },
  updateProfile: (updatedProfile) => {
    set((state) => ({
      profile: { ...state.profile, ...updatedProfile },
    }));
  },
}));



export const useSuccessModal = create((set) => ({
  message: "",
  isOpen: false,
  updateMessage: (newMessage) => 
    set({ message: newMessage}),
  updateIsOpen: (newIsOpen) => 
    set({ isOpen: newIsOpen })
}))



