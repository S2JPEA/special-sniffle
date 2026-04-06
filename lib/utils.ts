/**
 * Utility functions for the app
 */

/**
 * Copy text to clipboard with visual feedback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
}

/**
 * Local storage utilities for optional convenience features
 * User can enable/disable local storage for saved responses
 */
export const storage = {
  setSavedResponses: (responses: string[]) => {
    try {
      localStorage.setItem('rrg_responses', JSON.stringify(responses));
    } catch {
      console.warn('localStorage not available');
    }
  },

  getSavedResponses: (): string[] => {
    try {
      const saved = localStorage.getItem('rrg_responses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  addSavedResponse: (response: string) => {
    const responses = storage.getSavedResponses();
    responses.unshift(response);
    // Keep only last 20 saved responses
    if (responses.length > 20) {
      responses.pop();
    }
    storage.setSavedResponses(responses);
  },

  clearSavedResponses: () => {
    try {
      localStorage.removeItem('rrg_responses');
    } catch {
      console.warn('localStorage not available');
    }
  },

  getPreferences: () => {
    try {
      const prefs = localStorage.getItem('rrg_prefs');
      return prefs
        ? JSON.parse(prefs)
        : {
            enableLocalStorage: false,
            darkMode: false,
          };
    } catch {
      return {
        enableLocalStorage: false,
        darkMode: false,
      };
    }
  },

  setPreferences: (prefs: { enableLocalStorage?: boolean; darkMode?: boolean }) => {
    try {
      const current = storage.getPreferences();
      localStorage.setItem('rrg_prefs', JSON.stringify({ ...current, ...prefs }));
    } catch {
      console.warn('localStorage not available');
    }
  },
};

/**
 * Format text utilities
 */
export const text = {
  /**
   * Download a text file to the user's computer
   */
  downloadAsFile: (content: string, filename: string = 'reviews-reply.txt') => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },

  /**
   * Count words in text
   */
  countWords: (text: string): number => {
    return text.trim().split(/\s+/).length;
  },

  /**
   * Format character count
   */
  formatCharCount: (count: number): string => {
    return count.toLocaleString();
  },
};

/**
 * Validation utilities
 */
export const validate = {
  /**
   * Validate review text - minimum length
   */
  review: (text: string): { valid: boolean; error?: string } => {
    if (!text || text.trim().length === 0) {
      return { valid: false, error: 'Review text is required' };
    }
    if (text.trim().length < 10) {
      return { valid: false, error: 'Review must be at least 10 characters' };
    }
    if (text.trim().length > 5000) {
      return { valid: false, error: 'Review must be less than 5000 characters' };
    }
    return { valid: true };
  },

  /**
   * Validate business name
   */
  businessName: (name: string): { valid: boolean; error?: string } => {
    if (!name) return { valid: true }; // Optional field
    if (name.length < 2) {
      return { valid: false, error: 'Business name must be at least 2 characters' };
    }
    if (name.length > 100) {
      return { valid: false, error: 'Business name must be less than 100 characters' };
    }
    return { valid: true };
  },
};

/**
 * Extract text from user input that might be a review URL or quoted review
 */
export const parseReviewInput = (input: string): string => {
  // Remove extra whitespace
  let cleaned = input.trim();

  // Remove common quotation marks patterns
  cleaned = cleaned.replace(/^["']|["']$/g, '');

  // Remove URLs if they're at the start or end
  cleaned = cleaned.replace(/^https?:\/\/[^\s]+\s*/i, '');

  return cleaned.trim();
};
