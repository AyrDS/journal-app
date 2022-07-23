import { signInWithGoogle, signInWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredential, login, logout } from './authSlice';

export const checkingAuthentication = () => {
   return async (dispatch) => {
      dispatch(checkingCredential());
   }
}

export const startGoogleSignIn = () => {
   return async (dispatch) => {
      dispatch(checkingCredential());

      const result = await signInWithGoogle();

      if (!result.ok) {
         dispatch(logout(result.errorMsg))
      }

      dispatch(login(result));
   }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
   return async (dispatch) => {
      dispatch(checkingCredential());

      const { ok, uid, photoURL, errorMsg } = await signInWithEmailPassword({ email, password, displayName });

      if (!ok) return dispatch(logout(errorMsg));

      dispatch(login({ uid, displayName, email, photoURL }));

   }

}

export const startLoginWithEmailPassword = (email, password) => {
   return async (dispatch) => {
      dispatch(checkingCredential());

      const { ok, displayName, uid, errorMsg, photoURL } = await loginWithEmailPassword(email, password);

      if (!ok) return dispatch(logout(errorMsg));
      dispatch(login({ uid, displayName, email, photoURL }));
   }
}

export const startLogout = () => {
   return async (dispatch) => {
      await logoutFirebase();

      dispatch(clearNotesLogout());
      dispatch(logout());
   }
}