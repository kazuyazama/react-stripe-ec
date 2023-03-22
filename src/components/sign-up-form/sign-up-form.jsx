import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../firebase";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import "./sing-up-form.styles.scss"

const SignUpForm = () => {
  //初期値
  const defaultValues = {
    displayName: "",
    email: "",
    password: "",
    comfirmPassword: "",
  };

  const [formValues, setFormValues] = useState(defaultValues); //初期値をセット

  const { displayName, email, password, comfirmPassword } = formValues; //分割代入で取り出す

  console.log(formValues);

  const handleChange = (e) => {
    const { name, value } = e.target; //nameはinput属性のname valueは入力された値 分割代入で取得

    setFormValues({ ...formValues, [name]: value }); //展開して、nameに渡ってきた値を格納
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== comfirmPassword) {
      alert("パスワードと確認用パスワードが一致しません");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      setFormValues(defaultValues); //リセット
      alert("アカウント作成に成功しました");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("このアカウントはすでに登録されています");
      } else {
        alert("アカウント登録に失敗しました", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>アカウント登録はこちら</h2>
      <span>下記項目を入力してください</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="displayName"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="comfirm Password"
          type="password"
          required
          name="comfirmPassword"
          value={comfirmPassword}
          onChange={handleChange}
        />
        <Button buttonType="inverted">アカウント作成</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
