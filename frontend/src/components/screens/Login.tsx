import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Background, CredentialsForm } from "../ui";
import { getCurrentUser, login, UserCredentialsType } from "../../services/auth";
import styles from "./Auth.module.css";
import { AuthContext } from "../../providers";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    setError,
    formState: { errors },
  } = useForm();

  const loginButtonHandler: SubmitHandler<UserCredentialsType> = async (data: UserCredentialsType) => {
    let response = await login(data);
    if (!response.success) return setError("submit", { type: "custom", message: response.message });
    let response2 = await getCurrentUser();
    if (!response2.success) return setError("submit", { type: "custom", message: response2.message });
    setUser(response2.data);
  };

  console.log(user);

  const linkHandler: React.MouseEventHandler<HTMLParagraphElement> = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <Background />
      <div className={styles.auth_content_container}>
        <h1 className={styles.title}>Sign In</h1>
        <CredentialsForm onFormSubmit={loginButtonHandler} buttonText="Login" formStateErrors={errors} className={styles.auth_form} />
        <div className={styles.link}>
          <p onClick={linkHandler}>Don't have an account?</p>
        </div>
      </div>
    </>
  );
};

export default Login;
