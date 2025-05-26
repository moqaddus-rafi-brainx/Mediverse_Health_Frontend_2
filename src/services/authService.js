import {
  postCall,
  authorizedPostCall,
  authorizedPutCall,
  authorizedGetCall,
  authorizedDeleteCall,
} from './APIsService';

export const isLoggedIn = () => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (!token || !refreshToken) {
    return false;
  }
  return true;
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    postCall('/auth/login', { email, password })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = async () => {
  return new Promise((resolve, reject) => {
    localStorage.clear("user")
    postCall('/auth/logout', {
      token: localStorage.getItem('refresh_token'),
    })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    postCall('/auth/refresh-token', {
      token: localStorage.getItem('refresh_token'),
    })
      .then((data) => {
        localStorage.setItem('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verifyLogin = async () => {
  return new Promise((resolve, reject) => {
    !localStorage.getItem('access_token') && resolve(false);
    authorizedPostCall('/auth/verify-login')
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    postCall('/auth/forgot-password', { email })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const validateResetLink = (link) => {
  return new Promise((resolve, reject) => {
    postCall('/auth/validate_pass_reset_link', { token: link })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePasswordWithLink = (newPass, link) => {
  return new Promise((resolve, reject) => {
    console.log(newPass, link);
    postCall(`/auth/reset-password?token=${link}`, { newPass })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePassword = (
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  return new Promise((resolve, reject) => {
    authorizedPutCall('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAdminDetails = (userId) => {
  return new Promise((resolve, reject) => {
    authorizedGetCall(`/auth/user_detail/${userId}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProfile = (body) => {
  return new Promise((resolve, reject) => {
    authorizedPutCall('/auth/update', body)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const removeUser = (deleteUserId) => {
  return new Promise((resolve, reject) => {
    authorizedDeleteCall(`/auth/delete/${deleteUserId}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
