import { message} from "antd";
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../../rdx/slices/userAuthSlice";
import { useAppDispatch } from "../hooks";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import { db, firebaseApp } from "firebase";
import { getRandomAvatar } from "utils/getRandomAvatar";
import { createUserProfile } from "utils/createUserProfile";
import { changePhotoSize } from "utils/changePhotoSize";




export const useFirebaseAuth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();



    const onRegisterHandler = (email:string, password:string, name: string, surname: string) => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(async ({user}) => {
            message.loading('Loading...')
            const userRef = doc(db, 'users', user.uid)
            
            dispatch(setUser({
                userEmail: user.email,
                userId: user.uid,
                userPassword: user.refreshToken,
            }));
            
            await createUserProfile(user.uid)
            await updateDoc(userRef, {
                "personalData.userName": name,
                "personalData.userSurname": surname,
                "personalData.userFullname": `${name} ${surname}`,
                "profileData.userAvatar": getRandomAvatar(),
            })
            navigate('/profileCreating')
        })
        .catch((error) => {
            message.info(error.message, 3)
            message.error(error.code, 3)
        })
    }




    const onLoginHandler = useCallback((email:string, password:string) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                userEmail: user.email,
                userId: user.uid,
                userPassword: user.refreshToken,
            }));
            navigate('/myProfile')
        })
        .catch((error) => {
            message.info(error.message, 5)
            message.error(error.code, 5)
        });
    }, [])




    

    const onLoginByGoogle = useCallback(() => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            message.loading('Loading...')

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            const userRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(userRef);

            dispatch(setUser({
                userEmail: user.email,
                userId: user.uid,
                userPassword: token,
            }))

            if (docSnap.exists()) {
                navigate('/myProfile')
                return
            }
            await createUserProfile(user.uid)
            await updateDoc(userRef, {
                "personalData.userName": user.displayName?.split(" ")[0],
                "personalData.userSurname": user.displayName?.split(" ")[1],
                "personalData.userFullname": user.displayName,
                "profileData.userAvatar": user.photoURL ? changePhotoSize(user.photoURL) : getRandomAvatar(),
            })
            navigate('/profileCreating')
        })
        .catch((error) => {
            message.info(error.message, 5)
            message.error(error.code, 5)
        });
    }, [])



    const onLogOut = useCallback(() => {
        const auth = getAuth();

        signOut(auth)
        .then(() => {
            dispatch(removeUser());
        })
        .catch((error) => {
            message.error(error.message, 3)
        });

    }, [dispatch])



    return {
        onRegisterHandler,
        onLoginHandler,
        onLoginByGoogle,
        onLogOut
    }
}


