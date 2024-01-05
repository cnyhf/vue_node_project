import axios from 'axios'
// Add a request interceptor 请求之前
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //点登录按钮的时候也会来这个拦截器，不过第一次传给的是空的token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor 请求响应之后
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log(response.headers)
    const { authorization } = response.headers
    authorization && localStorage.setItem("token",authorization)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {status} = error.response
    if(status===401){
        localStorage.removeItem("token")
        window.location.href="#/login"
    }
    return Promise.reject(error);
  });
