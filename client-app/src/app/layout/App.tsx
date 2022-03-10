import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import RegisterSuccess from '../../features/users/RegisterSuccess';
import ConfirmEmail from '../../features/users/ConfirmEmail';
import EnterNewPasswordForm from '../../features/users/EnterNewPasswordForm';
import NewPasswordSuccess from '../../features/users/NewPasswordSuccess';
import SendNewPasswordUrlSuccess from '../../features/users/SendNewPasswordUrlSuccess';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();
  

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      userStore.getFacebookLoginStatus().then(() => commonStore.setAppLoaded());
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />
  
  var marginValue = '7em'; 
  if (location.pathname === '/') marginValue = '0em';
 
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      {location.pathname !== '/' && <NavBar /> }
      <Container style={{marginTop: marginValue}}> 
         <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/activities/:id' element={<ActivityDetails />} />
          <Route key={location.key} path='/createActivity' element={<ActivityForm />} />
          <Route key={location.key} path='/manage/:id' element={<ActivityForm />} />
          <Route path='/profiles/:username' element={<ProfilePage />} />
          <Route path='/errors' element={<TestErrors />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/account'>
            <Route path='registerSuccess' element={<RegisterSuccess />} />
            <Route path='verifyEmail' element={<ConfirmEmail />} />
            <Route path='newPasswordForm' element={<EnterNewPasswordForm />} />
            <Route path='newPasswordSuccess' element={<NewPasswordSuccess />} />
            <Route path='sendNewPasswordUrlSuccess' element={<SendNewPasswordUrlSuccess />} />
          </Route>
          <Route path='/login' element={<LoginForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
      
    </>
  );
}

export default observer(App);
