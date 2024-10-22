import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Background, CredentialsForm } from "../ui";
import styles from "./Auth.module.css";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
  } = useForm();

  const loginButtonHandler: SubmitHandler<T> = (data) => {
    console.log(data);
  };

  const linkHandler: React.MouseEvent<HTMLElement> = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <Background />
      <div className={styles.auth_content_container}>
        <h1 className={styles.title}>Sign In</h1>
        <CredentialsForm onSubmit={loginButtonHandler} buttonText="Login" formStateErrors={errors} className={styles.auth_form} />
        <div className={styles.link}>
          <p onClick={linkHandler}>Don't have an account?</p>
        </div>
      </div>
    </>
  );
};

export default Login;
