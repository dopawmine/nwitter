import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [newAccount, setNewAccount] = useState(true);
   const [error, setError] = useState("");

   const onChange = (event) => {
      const {
         target: { name, value },
      } = event;
      if (name === "email") {
         setEmail(value);
      } else if (name === "password") {
         setPassword(value);
      }
   };
   const onSubmit = async (event) => {
      event.preventDefault();
      try {
         let data;
         if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(email, password);
         } else {
            data = await authService.signInWithEmailAndPassword(email, password);
         }
         console.log(data);
      } catch (error) {
         setError(error.message);
      }
   };

   const toggleAccount = () => setNewAccount((prev) => !prev);
   return (
      <>
         <form onSubmit={onSubmit} className="container">
            <input
               className="authInput"
               name="email"
               type="email"
               placeholder="Email"
               required
               value={email}
               onChange={onChange}
            />
            <input
               className="authInput"
               name="password"
               type="password"
               placeholder="Password"
               required
               value={password}
               onChange={onChange}
            />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error && <span className="authError">{error}</span>}
         </form>
         <span className="authSwitch" onClick={toggleAccount}>
            {newAccount ? "Sign in" : "Create Account"}
         </span>
      </>
   );
};

export default AuthForm;
