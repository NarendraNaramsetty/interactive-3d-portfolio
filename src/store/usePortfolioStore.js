import { create } from 'zustand';

export const usePortfolioStore = create((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  
  loadingProgress: 0,
  setLoadingProgress: (progress) => set((state) => {
    const nextProgress = Math.min(progress, 100);
    return { 
      loadingProgress: nextProgress, 
      isLoading: nextProgress < 100 
    };
  }),
  isLoading: true,
  
  scrollPercent: 0,
  setScrollPercent: (percent) => set({ scrollPercent: percent }),
  
  selectedProject: null,
  setSelectedProject: (proj) => set({ selectedProject: proj }),
}));
