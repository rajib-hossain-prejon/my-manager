import { Stack } from 'expo-router';

import colors from '../../main/config/colors';
import routes from '../../main/navigation/routes';

const StackScreen = ({ name, title }) => (
  <Stack.Screen name={name} options={{ title: title }} />
);


export default function Layout() {

  const stackData = [
  { route: routes.PROJECT_PAGE},
  { route: routes.HOME_PAGE},
  { route: routes.ABOUT_PAGE},
  { route: routes.BLOG_PAGE},
  { route: routes.CLIENTS_PROJECT },
];

  return (
    <Stack
      // https://reactnavigation.org/docs/headers#sharing-common-options-across-screens
      screenOptions={{
       gestureEnabled: true,
       gestureDirection: 'vertical',
       cardStyleInterpolator: ({ current }) => {
          return {
            cardStyle: {
              opacity: current.progress,
            },
          };
        },
        headerStyle: {
          backgroundColor: colors.primary,
          
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route. */}
      {/* {
        stackData.map((stack,index)=>
        <Stack.Screen name={stack.path} options={{ title: stack.header }}  />)
      } */}
      

    {/* -------------------- Pages-----------------------------   */}
  <Stack.Screen name={routes.PAGES.path} options={{ title: routes.PAGES.header }} />

{/* -------------------- Project Pages-----------------------------   */}
      <Stack.Screen name={routes.PROJECT_PAGE.path} options={{ title: routes.PROJECT_PAGE.header }} />
          <Stack.Screen name={routes.ADD_PROJECT_PAGE_PROJECTS.path} options={{ title: routes.ADD_PROJECT_PAGE_PROJECTS.header }} />

{/* -------------------- Home Page-----------------------------   */}
      <Stack.Screen name={routes.HOME_PAGE.path} options={{ title: routes.HOME_PAGE.header }} />
       <Stack.Screen name={routes.ADD_HOMEPAGE_PROJECTS.path} options={{ title: routes.ADD_HOMEPAGE_PROJECTS.header }} />
        <Stack.Screen name={routes.ADD_SERVICES.path} options={{ title: routes.ADD_SERVICES.header }} />
         <Stack.Screen name={routes.REVIEW_APPROVALLS.path} options={{ title: routes.REVIEW_APPROVALLS.header }} />
         <Stack.Screen name={routes.ADD_LOWER_PROJECT.path} options={{ title: routes.ADD_LOWER_PROJECT.header }} />
          <Stack.Screen name={routes.ADD_MID_PROJECT.path} options={{ title: routes.ADD_MID_PROJECT.header }} />
          <Stack.Screen name={routes.SHOW_DATAS.path} options={{ title: routes.SHOW_DATAS.header }} />


      {/* --------------------About Page-----------------------------   */}
      <Stack.Screen name={routes.ABOUT_PAGE.path} options={{ title: routes.ABOUT_PAGE.header }} />
       <Stack.Screen 
       name={routes.ADD_SKILLS.path}
        options={{ title: routes.ADD_SKILLS.header }} />

      {/* --------------------Blog Page-----------------------------   */}
      <Stack.Screen name={routes.BLOG_PAGE.path} options={{ title: routes.BLOG_PAGE.header }} />
       <Stack.Screen name={routes.ADD_BLOG.path} options={{ title: routes.ADD_BLOG.header }} />

      {/* --------------------Client Page-----------------------------   */}
      <Stack.Screen name={routes.CLIENTS_PROJECT.path} options={{ title: routes.CLIENTS_PROJECT.header }} />
      <Stack.Screen name={routes.PROJECTS.path} options={{ title: routes.PROJECTS.header }} />

      {/* <Stack.Screen name="tabs" options={{ headerShown: false}} /> */}
    </Stack>
  );
}
