import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Background, CredentialsForm } from "../ui";
import styles from "./Auth.module.css";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
  } = useForm();

  const registerButtonHandler: SubmitHandler<T> = (data) => {
    console.log(data);
  };

  const linkHandler: React.MouseEvent<HTMLElement> = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <Background />
      <div className={styles.auth_content_container}>
        <h1 className={styles.title}>Sign Up</h1>
        <CredentialsForm onSubmit={registerButtonHandler} buttonText="Register" formStateErrors={errors} className={styles.auth_form} />
        <div className={styles.link}>
          <p onClick={linkHandler}>Already have an account?</p>
        </div>
      </div>
    </>
  );
};

export default Register;
