import React, { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword, signInWithGooglePopup
} from "../../firebase";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import "./sing-in-form.styles.scss";

const SignInForm = () => {

  //初期値
  const defaultValues = {
    email: "",
    password: "",
  };


  const [formValues, setFormValues] = useState(defaultValues); //初期値をセット

  const { email, password } = formValues; //分割代入で取り出す

  const signInwighGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (e) => {
    const { name, value } = e.target; //nameはinput属性のname valueは入力された値 分割代入で取得

    setFormValues({ ...formValues, [name]: value }); //展開して、nameに渡ってきた値を格納
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setFormValues(defaultValues); //リセット
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("パスワードが間違っています");
          break;
        case "auth/user-not-found":
          alert("ユーザー名が間違っています");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>既にアカウントをお持ちの方</h2>
      <span>メールアドレスとパスワードを入力してください</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Emall"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">サインイン</Button>
          <Button type="button" onClick={signInwighGoogle} buttonType="google">
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
