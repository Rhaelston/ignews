import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react';


export function SignInButton () {
    const { data: Session } = useSession()

    console.log(Session);

    return Session ?( 
       <button
        type='button'
        className={styles.signInButton}
        onClick={()=>signOut()}  
       >
        <FaGithub color="#04d361" />
            {Session.user.name}
        <FiX color="#737380" className={styles.closeIcon}/>    
       </button>
    ) : (
        <button
        type='button'
        className={styles.signInButton}
        onClick={()=>signIn('github')}
       >
           <FaGithub color="#eba417" />
           Sign In with GitHub
       </button>
    );
}