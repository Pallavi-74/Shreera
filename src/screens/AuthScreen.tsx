// // import { useState, type FormEvent } from "react";
// import { useState } from "react";
// import type React from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../firebase";
// import "./AuthPage.css";

// type AuthPageProps = {
//   onSuccess?: () => void;
// };

// export function AuthScreen({ onSuccess }: AuthPageProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError("");

//     // 👈 Guard clause for null auth
//     if (!auth) {
//       setError("Firebase is not configured correctly. Check your environment variables.");
//       return;
//     }

//     if (!isLogin && !name.trim()) {
//       setError("Please enter your full name.");
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must contain at least 6 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(
//           auth,
//           email.trim(),
//           password
//         );
//       } else {
//         const result = await createUserWithEmailAndPassword(
//           auth,
//           email.trim(),
//           password
//         );

//         await updateProfile(result.user, {
//           displayName: name.trim(),
//         });
//       }

//       onSuccess?.();
//     } catch (err: unknown) {
//       const code =
//         typeof err === "object" &&
//         err !== null &&
//         "code" in err
//           ? String(err.code)
//           : "";

//       const messages: Record<string, string> = {
//         "auth/invalid-email":
//           "Please enter a valid email address.",
//         "auth/invalid-credential":
//           "Incorrect email or password.",
//         "auth/user-not-found":
//           "No account found. Please register first.",
//         "auth/wrong-password":
//           "Incorrect email or password.",
//         "auth/email-already-in-use":
//           "An account with this email already exists.",
//         "auth/weak-password":
//           "Please choose a stronger password.",
//         "auth/too-many-requests":
//           "Too many attempts. Please try again later.",
//         "auth/network-request-failed":
//           "Network error. Please check your internet connection.",
//         "auth/popup-closed-by-user":
//           "Google sign-in was cancelled.",
//         "auth/popup-blocked":
//           "Your browser blocked the sign-in popup. Please allow popups and try again.",
//         "auth/cancelled-popup-request":
//           "Another sign-in popup is already open.",
//         "auth/unauthorized-domain":
//           "This domain is not authorized for Firebase sign-in.",
//         "auth/operation-not-allowed":
//           "This sign-in method is not enabled in Firebase.",
//       };

//       setError(
//         messages[code] || "Unable to continue. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleGoogleSignIn() {
//     setError("");

//     // 👈 Guard clause for null auth
//     if (!auth) {
//       setError("Firebase is not configured correctly. Check your environment variables.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const provider = new GoogleAuthProvider();

//       provider.setCustomParameters({
//         prompt: "select_account",
//       });

//       await signInWithPopup(auth, provider);

//       onSuccess?.();
//     } catch (err: unknown) {
//       const code =
//         typeof err === "object" &&
//         err !== null &&
//         "code" in err
//           ? String(err.code)
//           : "";

//       const messages: Record<string, string> = {
//         "auth/popup-closed-by-user":
//           "Google sign-in was cancelled.",
//         "auth/popup-blocked":
//           "Please allow popups in your browser and try again.",
//         "auth/cancelled-popup-request":
//           "A sign-in request is already in progress.",
//         "auth/unauthorized-domain":
//           "This domain is not authorized in Firebase.",
//         "auth/operation-not-allowed":
//           "Google sign-in is not enabled in Firebase.",
//         "auth/network-request-failed":
//           "Network error. Please check your internet connection.",
//         "auth/account-exists-with-different-credential":
//           "An account already exists with this email using another sign-in method.",
//       };

//       setError(
//         messages[code] || "Google sign-in failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <div className="auth-brand">SHREERA</div>

//         <p className="auth-tagline">
//           Crafted for the Woman You Are
//         </p>

//         <div className="auth-tabs">
//           <button
//             type="button"
//             className={isLogin ? "active" : ""}
//             onClick={() => {
//               setIsLogin(true);
//               setError("");
//             }}
//             disabled={loading}
//           >
//             Login
//           </button>

//           <button
//             type="button"
//             className={!isLogin ? "active" : ""}
//             onClick={() => {
//               setIsLogin(false);
//               setError("");
//             }}
//             disabled={loading}
//           >
//             Register
//           </button>
//         </div>

//         <h2>
//           {isLogin ? "Welcome Back" : "Create Your Account"}
//         </h2>

//         <p className="auth-description">
//           {isLogin
//             ? "Sign in to continue your shopping journey."
//             : "Join Shreera and discover your style."}
//         </p>

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div className="auth-field">
//               <label htmlFor="name">Full Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 autoComplete="name"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           )}

//           <div className="auth-field">
//             <label htmlFor="email">Email Address</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               autoComplete="email"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="auth-field">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete={
//                 isLogin ? "current-password" : "new-password"
//               }
//               minLength={6}
//               required
//               disabled={loading}
//             />
//           </div>

//           {!isLogin && (
//             <div className="auth-field">
//               <label htmlFor="confirmPassword">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Re-enter your password"
//                 value={confirmPassword}
//                 onChange={(e) =>
//                   setConfirmPassword(e.target.value)
//                 }
//                 autoComplete="new-password"
//                 minLength={6}
//                 required
//                 disabled={loading}
//               />
//             </div>
//           )}

//           {error && (
//             <p className="auth-error" role="alert">
//               {error}
//             </p>
//           )}

//           <button
//             className="auth-submit"
//             type="submit"
//             disabled={loading}
//           >
//             {loading
//               ? "Please wait..."
//               : isLogin
//                 ? "Sign In"
//                 : "Create Account"}
//           </button>
//         </form>

//         <div className="auth-divider">
//           <span>OR</span>
//         </div>

//         <button
//           type="button"
//           className="google-signin-button"
//           onClick={handleGoogleSignIn}
//           disabled={loading}
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 48 48"
//             aria-hidden="true"
//           >
//             <path
//               fill="#EA4335"
//               d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
//             />
//             <path
//               fill="#4285F4"
//               d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.93 46.98 31.7 46.98 24.55Z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
//             />
//             <path
//               fill="#34A853"
//               d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
//             />
//           </svg>

//           <span>
//             {loading ? "Please wait..." : "Continue with Google"}
//           </span>
//         </button>

//         <p className="auth-switch">
//           {isLogin
//             ? "Don't have an account?"
//             : "Already have an account?"}{" "}

//           <button
//             type="button"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//             }}
//             disabled={loading}
//           >
//             {isLogin ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useState, type FormEvent } from "react";
import { useState } from "react";
import type React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useApp } from "../context/AppContext"; // 👈 Import useApp for navigation
import "./AuthPage.css";

type AuthPageProps = {
  onSuccess?: () => void;
};

export function AuthScreen({ onSuccess }: AuthPageProps) {
  const { navigateTo } = useApp(); // 👈 Access navigateTo from context
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!auth) {
      setError("Firebase is not configured correctly. Check your environment variables.");
      return;
    }

    if (!isLogin && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await updateProfile(result.user, {
          displayName: name.trim(),
        });
      }

      onSuccess?.();
      navigateTo('home'); // 👈 Redirects user to home page on success
    } catch (err: unknown) {
      const code =
        typeof err === "object" &&
        err !== null &&
        "code" in err
          ? String(err.code)
          : "";

      const messages: Record<string, string> = {
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/user-not-found": "No account found. Please register first.",
        "auth/wrong-password": "Incorrect email or password.",
        "auth/email-already-in-use": "An account with this email already exists.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/popup-blocked": "Your browser blocked the sign-in popup. Please allow popups and try again.",
        "auth/cancelled-popup-request": "Another sign-in popup is already open.",
        "auth/unauthorized-domain": "This domain is not authorized for Firebase sign-in.",
        "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
      };

      setError(
        messages[code] || "Unable to continue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");

    if (!auth) {
      setError("Firebase is not configured correctly. Check your environment variables.");
      return;
    }

    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);

      onSuccess?.();
      navigateTo('home'); // 👈 Redirects user to home page on Google sign-in success
    } catch (err: unknown) {
      const code =
        typeof err === "object" &&
        err !== null &&
        "code" in err
          ? String(err.code)
          : "";

      const messages: Record<string, string> = {
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/popup-blocked": "Please allow popups in your browser and try again.",
        "auth/cancelled-popup-request": "A sign-in request is already in progress.",
        "auth/unauthorized-domain": "This domain is not authorized in Firebase.",
        "auth/operation-not-allowed": "Google sign-in is not enabled in Firebase.",
        "auth/network-request-failed": "Network error. Please check your internet connection.",
        "auth/account-exists-with-different-credential": "An account already exists with this email using another sign-in method.",
      };

      setError(
        messages[code] || "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">SHREERA</div>

        <p className="auth-tagline">
          Crafted for the Woman You Are
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            disabled={loading}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            disabled={loading}
          >
            Register
          </button>
        </div>

        <h2>
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        <p className="auth-description">
          {isLogin
            ? "Sign in to continue your shopping journey."
            : "Join Shreera and discover your style."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                isLogin ? "current-password" : "new-password"
              }
              minLength={6}
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
                minLength={6}
                required
                disabled={loading}
              />
            </div>
          )}

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-signin-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.93 46.98 31.7 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>

          <span>
            {loading ? "Please wait..." : "Continue with Google"}
          </span>
        </button>

        <p className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            disabled={loading}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}