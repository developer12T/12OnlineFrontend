import axios from "axios";
// Centralized error handling utility
export class ErrorHandler {
  static handleApiError(error) {
    console.error('API Error:', error);

    // Check for "Invalid token" error
    if (error.response && error.response.data === "Invalid token") {
      console.log("Invalid token detected, logging out...");
      this.handleInvalidToken();
      return true; // Error was handled
    }

    // Check for 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access detected, logging out...");
      this.handleInvalidToken();
      return true; // Error was handled
    }

    // Check for 403 Forbidden
    if (error.response && error.response.status === 403) {
      console.log("Access forbidden, logging out...");
      this.handleInvalidToken();
      return true; // Error was handled
    }

    return false; // Error was not handled
  }

  static handleInvalidToken() {
    // Clear all user data from localStorage
    const itemsToRemove = [
      'token',
      'userName',
      'userEmail',
      'userRole',
      'lastLogin',
      'orderPage',
      'fullname',
      'department',
      'departmentDescrip',
      'user'
    ];

    itemsToRemove.forEach(item => {
      localStorage.removeItem(item);
    });

    // Show SweetAlert2 notification
    this.showLogoutNotification();
  }

  static showLogoutNotification() {
  }

  // Axios interceptor setup
  static setupAxiosInterceptors() {
    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle token-related errors globally
        if (this.handleApiError(error)) {
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }
}

// Auto-setup interceptors when this module is imported
if (typeof window !== 'undefined') {
  import('axios').then(({ default: axios }) => {
    ErrorHandler.setupAxiosInterceptors();
  });
} 