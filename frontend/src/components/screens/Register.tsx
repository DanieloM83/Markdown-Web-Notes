import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Background, CredentialsForm } from "../ui";
import { getCurrentUser, login, register, UserCredentialsType } from "../../services/auth";
import styles from "./Auth.module.css";
import { AuthContext } from "../../providers";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    setError,
    formState: { errors },
  } = useForm<UserCredentialsType>();

  const registerButtonHandler: SubmitHandler<UserCredentialsType> = async (data: UserCredentialsType) => {
    let response = await register(data);
    if (!response.success) return setError("root", { type: "custom", message: response.message });
    let response2 = await login(data);
    if (!response2.success) return setError("root", { type: "custom", message: response2.message });
    let response3 = await getCurrentUser();
    if (!response3.success) return setError("root", { type: "custom", message: response3.message });
    setUser(response3.data);
    navigate("/");
  };
  const linkHandler: React.MouseEventHandler<HTMLParagraphElement> = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <Background />
      <div className={styles.auth_content_container}>
        <h1 className={styles.title}>Sign Up</h1>
        <CredentialsForm onFormSubmit={registerButtonHandler} buttonText="Register" formStateErrors={errors} className={styles.auth_form} />
        <div className={styles.link}>
          <p onClick={linkHandler}>Already have an account?</p>
        </div>
      </div>
    </>
  );
};

export default Register;
