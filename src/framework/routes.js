import Home from '../container/home';
import Login from '../container/login';
import Register from '../container/login/register';
import FindPwd from '../container/login/findPwd';
import App from './App';

/* eslint-disable global-require */
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/findPwd', component: FindPwd }
  ],
};

export default routes;
