import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { UserCredentialsSchema as CredentialsSchema } from "../../services/auth";
import { Button } from "./";
import styles from "./CredentialsForm.module.css";

type CredentialsFormData = z.infer<typeof CredentialsSchema>;

interface CredentialsFormProps {
  onSubmit: (data: CredentialsFormData) => void;
  buttonText?: string;
  formStateErrors?: FieldErrors<CredentialsFormData>;
}

const CredentialsForm: FC<CredentialsFormProps> = ({ onSubmit, buttonText = "Submit", formStateErrors, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: internalErrors },
  } = useForm<CredentialsFormData>({
    resolver: zodResolver(CredentialsSchema),
    mode: "onChange",
  });

  const errors = formStateErrors && internalErrors;

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={styles.form_input}>
        <input {...register("username")} placeholder="username" />
        {errors.username && <p className={`error ${styles.error}`}>{errors.username.message}</p>}
      </div>
      <div className={styles.form_input}>
        <input {...register("password")} placeholder="password" type="password" />
        {errors.password && <p className={`error ${styles.error}`}>{errors.password.message}</p>}
      </div>

      <Button className={styles.form_button} callback={handleSubmit(onSubmit)} text={buttonText} disabled={Object.keys(errors).length !== 0} />
      {errors.submit && <p className={`error ${styles.error}`}>{errors.submit.message}</p>}
    </form>
  );
};

export default CredentialsForm;
