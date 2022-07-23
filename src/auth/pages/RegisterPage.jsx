import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import validator from 'validator';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formValidations = {
   email: [(value) => validator.isEmail(value), 'Enter a valid email'], //value.includes('@')
   password: [(value) => value.length >= 6, 'Password must be more than 6 characters'],
   displayName: [(value) => value.length >= 1, 'Name is required']
}

export const RegisterPage = () => {

   const dispatch = useDispatch();
   const { status, errorMsg } = useSelector(state => state.auth);
   const [formSubmitted, setFormSubmitted] = useState(false);
   const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


   const { onInputChange, email, password, formState, displayName, isFormValid, displayNameValid, emailValid, passwordValid } = useForm({
      email: '',
      password: '',
      displayName: ''
   }, formValidations);


   const onSubmit = (e) => {
      e.preventDefault();
      setFormSubmitted(true);

      if (!isFormValid) return;

      dispatch(startCreatingUserWithEmailPassword(formState))
   }

   return (
      <AuthLayout title='Register'>
         <h1>Form valid {isFormValid ? 'Valido' : 'Incorrecto'} </h1>
         <form
            onSubmit={onSubmit}
            className='animate__animated animate__fadeIn animate__faster'
         >
            <Grid container>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Full Name'
                     type='text'
                     placeholder='Ayrton Da Silva'
                     fullWidth
                     value={displayName}
                     name='displayName'
                     onChange={onInputChange}
                     error={!!displayNameValid && formSubmitted}
                     helperText={formSubmitted && displayNameValid}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Email'
                     type='email'
                     placeholder='email@email.com'
                     fullWidth
                     value={email}
                     name='email'
                     onChange={onInputChange}
                     error={!!emailValid && formSubmitted}
                     helperText={formSubmitted && emailValid}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label='Password'
                     type='password'
                     placeholder='Password'
                     fullWidth
                     value={password}
                     name='password'
                     onChange={onInputChange}
                     error={!!passwordValid && formSubmitted}
                     helperText={formSubmitted && passwordValid}
                  />
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid
                     item
                     xs={12}
                     display={!!errorMsg ? '' : 'none'}
                  >
                     <Alert severity='error' >{errorMsg}</Alert>
                  </Grid>

                  <Grid item xs={12}>
                     <Button type='submit' variant='contained' fullWidth disabled={isCheckingAuthentication}>
                        Create Account
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction='row' justifyContent='end'>
                  <Typography mr={1}>
                     Do you already have an account?
                  </Typography>
                  <Link component={RouterLink} color='inherit' to='/auth/login'>
                     Login
                  </Link>
               </Grid>
            </Grid>
         </form>
      </AuthLayout>
   );
};
