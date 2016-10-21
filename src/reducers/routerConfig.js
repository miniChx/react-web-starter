/**
 * Created by baoyinghai on 10/20/16.
 */
import { INCREASE, DECREASE, ADD_PAGE } from '../actions/types';
import { App, Home, Foo, SubPage, NoMatch, Loading, MenuManager, UserManager, ModuleFactory, PageContainer }
  from '../components';

const routeConfig = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/home', component: Home },
    { path: '/menu_manager', component: MenuManager },
    { path: '/user_manager', component: UserManager },
    { path: '/module_factory', component: ModuleFactory},
    { path: '/page_container/:id', component: PageContainer},
    { path: '*', component: NoMatch },
  ]
};


export default function update(state = routeConfig, action) {
  switch (action.type) {
    default:
      return state;
  }
}
