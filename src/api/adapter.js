const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const apiCall = async (path, options) => {
  try {
    options = options || {};
    const accessToken = localStorage.getItem('uAccessToken');
    const refreshToken = localStorage.getItem('uRefreshToken');

    const headers = {
      ...options.headers,
      'u-access-token': accessToken
    };

    console.log(`${baseURL}/${path}`);

    const response = await fetch(`${baseURL}/${path}`, {...options, headers});
    const apiResponse = await response.json();

    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch(`${baseURL}/api/auth/token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'u-refresh-token': refreshToken
        }
      });

      if (refreshResponse.status === 200) {
        const newAccessToken = (await refreshResponse.json()).data.accessToken;
        localStorage.setItem('uAccessToken', newAccessToken);
        return apiCall(path, options);
      }
    }

    return {
      success: apiResponse.success,
      message: apiResponse.message,
      messageCode: apiResponse.messageCode,
      data: apiResponse.data
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: 'Something went wrong',
      messageCode: 'SOMETHING_WENT_WRONG',
      data: null
    };
  }
}
