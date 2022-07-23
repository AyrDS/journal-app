import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
   email: '',
   password: ''
}

export const LoginPage = () => {

   const { status, errorMsg } = useSelector(state => state.auth);
   const dispatch = useDispatch();

   const { onInputChange, email, password, formState } = useForm(formData);

   const isAuthenticating = useMemo(() => status === 'checking', [status]);

   const onSubmit = (e) => {
      e.preventDefault();
      console.log(formState);

      dispatch(startLoginWithEmailPassword(email, password));
   }

   const onGoogleSignIn = () => {
      console.log('Google sign in');

      dispatch(startGoogleSignIn());

   }

   return (
      <AuthLayout title='Login'>
         <form
            onSubmit={onSubmit}
            className='animate__animated animate__fadeIn animate__faster'
         >
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Email'
                     type='email'
                     placeholder='email@email.com'
                     fullWidth
                     name='email'
                     onChange={onInputChange}
                     value={email}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Password'
                     type='password'
                     placeholder='Password'
                     fullWidth
                     name='password'
                     onChange={onInputChange}
                     value={password}
                  />
               </Grid>

               <Grid container display={!!errorMsg ? '' : 'none'} sx={{ mt: 1 }}>
                  <Grid
                     item
                     xs={12}
                  >
                     <Alert severity='error' >{errorMsg}</Alert>
                  </Grid>

               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                  <Grid item xs={12} sm={6}>
                     <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        disabled={isAuthenticating}
                     >
                        Login
                     </Button>
                  </Grid>

                  <Grid item xs={12} sm={6}>

                     <Button
                        variant='contained'
                        fullWidth
                        onClick={onGoogleSignIn}
                        disabled={isAuthenticating}
                     >
                        <Google />
                        <Typography sx={{ ml: 1 }}>Google</Typography>
                     </Button>

                  </Grid>
               </Grid>

               <Grid container direction='row' justifyContent='end'>
                  <Link
                     component={RouterLink}
                     color='inherit'
                     to='/auth/register'
                  >
                     Crear una cuenta
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>
   );
};
