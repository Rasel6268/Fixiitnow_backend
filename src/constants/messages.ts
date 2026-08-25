const MESSAGES = {
  // =========================
  // SERVER
  // =========================
  SERVER: {
    RUNNING: 'FixItNow API Server is running successfully',
    STARTED: 'FixItNow server started successfully',
    SHUTDOWN: 'Server is shutting down',
  },

  // =========================
  // AUTH
  // =========================
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'You are not authorized to access this resource',
    FORBIDDEN: 'You do not have permission to perform this action',
    TOKEN_REQUIRED: 'Authentication token is required',
    TOKEN_INVALID: 'Invalid or expired authentication token',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
  },

  // =========================
  // USER
  // =========================
  USER: {
    CREATED: 'User created successfully',
    FETCHED: 'User fetched successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    FETCH_ALL_SUCCESS: 'Users fetched successfully',
  },

  // =========================
  // SERVICE
  // =========================
  SERVICE: {
    CREATED: 'Service created successfully',
    FETCHED: 'Service fetched successfully',
    UPDATED: 'Service updated successfully',
    DELETED: 'Service deleted successfully',
    NOT_FOUND: 'Service not found',
    FETCH_ALL_SUCCESS: 'Services fetched successfully',
  },

  // =========================
  // BOOKING
  // =========================
  BOOKING: {
    CREATED: 'Booking created successfully',
    FETCHED: 'Booking fetched successfully',
    UPDATED: 'Booking updated successfully',
    CANCELLED: 'Booking cancelled successfully',
    DELETED: 'Booking deleted successfully',
    NOT_FOUND: 'Booking not found',
  },

  // =========================
  // TECHNICIAN
  // =========================
  TECHNICIAN: {
    CREATED: 'Technician profile created successfully',
    FETCHED: 'Technician profile fetched successfully',
    UPDATED: 'Technician profile updated successfully',
    NOT_FOUND: 'Technician not found',
    UNAVAILABLE: 'Technician is currently unavailable',
  },

  // =========================
  // VALIDATION
  // =========================
  VALIDATION: {
    REQUIRED_FIELDS: 'Required fields are missing',
    INVALID_DATA: 'Invalid data provided',
    INVALID_ID: 'Invalid ID provided',
  },

  // =========================
  // GENERAL
  // =========================
  GENERAL: {
    SUCCESS: 'Operation completed successfully',
    FAILED: 'Operation failed',
    NOT_FOUND: 'Resource not found',
    INTERNAL_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad request',
  },
};
export  default MESSAGES;