
import '../styles/App.css'; // link to path

import { createBrowserRouter, RouterProvider} from 'react-router-dom' // use dom library to create route


/** import components */
import Main from './Main'
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';

/** react routes */
const router = createBrowserRouter([ // pages for different links
  {
    path: '/', // root route
    element : <Main></Main>
  }, 
  {
    path: '/quiz', 
    element : <CheckUserExist><Quiz></Quiz></CheckUserExist>
  }, 
  {
    path: '/result', 
    element : <CheckUserExist><Result></Result></CheckUserExist>
  }, 
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
