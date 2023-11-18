import { message} from "antd";
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../rdx/slices/userAuthSlice";
import { useAppDispatch } from "./hooks";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db, firebaseApp } from "firebase";
import { getRandomAvatar } from "utils/profileOptions";



export const useFirebaseAuth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const changePhotoSize = (url:string) => {
        if (url.includes('s96-c')) {
            let newUrl = url.replace('s96-c', 's400-c')
            return newUrl
        }
    }


    const onRegisterHandler = (email:string, password:string, name: string, surname: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {

                message.loading('Loading...')

                dispatch(setUser({
                    userEmail: user.email,
                    userId: user.uid,
                    userPassword: user.refreshToken,
                }));

                await setDoc(doc(db, 'users', user.uid), {
                    userId: user.uid,
                    userName: name,
                    userSurname: surname,
                    userFullname: `${name} ${surname}`,
                    registerDate: Date.now(),
                    userAvatar: getRandomAvatar(),
                    posts: [],
                    photos: [], 
                    friends: [],
                    friendRequests: [],
                    followingList:[],
                    chatBackground: 'default',
                }, { merge: true })

                navigate('/profileCreating')
            })

            .catch((error) => {
                message.info(error.message, 3)
                message.error(error.code, 3)
            })
    }




    const onLoginHandler = useCallback(
        (email:string, password:string) => {

        signInWithEmailAndPassword(auth, email, password)
        .then(async({user}) => {
            await dispatch(setUser({
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
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            message.loading('Loading...')


            dispatch(setUser({
                userEmail: user.email,
                userId: user.uid,
                userPassword: token,
            }))

            const userRef = doc(db, 'users', user.uid)

            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                navigate('/myProfile')
                return
            }

            await setDoc((userRef), {
                userId: user.uid,
                userName: user.displayName?.split(" ")[0],
                userSurname: user.displayName?.split(" ")[1],
                userFullname: user.displayName,
                registerDate: Date.now(),
                userAvatar: user.photoURL ? changePhotoSize(user.photoURL) : getRandomAvatar(),
                posts: [],
                photos: [], 
                friends: [],
                friendRequests: [],
                followingList:[],
                chatBackground: 'default',
            }, { merge: true })
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


