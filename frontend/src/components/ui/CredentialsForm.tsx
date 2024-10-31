import { FC, HTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { UserCredentialsType as CredentialsFormData, UserCredentialsSchema as CredentialsSchema } from "../../services/auth";
import { Button } from "./";
import styles from "./CredentialsForm.module.css";

interface CredentialsFormProps extends HTMLAttributes<HTMLFormElement> {
  onFormSubmit: (data: CredentialsFormData) => void;
  buttonText?: string;
  formStateErrors?: FieldErrors<CredentialsFormData>;
}

const CredentialsForm: FC<CredentialsFormProps> = ({ onFormSubmit, buttonText = "Submit", formStateErrors, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: internalErrors },
  } = useForm<CredentialsFormData>({
    resolver: zodResolver(CredentialsSchema),
    mode: "onChange",
  });

  const errors = internalErrors;
  
  return (
    <form {...props}>
      <div className={styles.form_input}>
        <input {...register("username")} placeholder="username" />
        {errors.username && <p className={`error ${styles.error}`}>{errors.username.message}</p>}
      </div>
      <div className={styles.form_input}>
        <input {...register("password")} placeholder="password" type="password" />
        {errors.password && <p className={`error ${styles.error}`}>{errors.password.message}</p>}
      </div>

      <Button className={styles.form_button} callback={handleSubmit(onFormSubmit)} text={buttonText} disabled={Object.keys(errors).length !== 0} />
      {formStateErrors.root && <p className={`error ${styles.error}`}>{formStateErrors.root.message}</p>}
    </form>
  );
};

export default CredentialsForm;
