import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Geçerli bir isim giriniz");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);
  return (
    <div className="Login-Page">
      <div className="Container">
        <div className="Login-Form">
        <h1>Kayıt Ol</h1>
          <Form>
            <Form.Field>
              <input
                type="text"
                className="register__textBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adı Soyadı"
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                className="register__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
              />
            </Form.Field>
            <Form.Field>
              <input
                type="password"
                className="register__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
              />
            </Form.Field>
            <Button onClick={register}>Kayıt Ol</Button>
            <Button onClick={signInWithGoogle}>Google ile Kayıt Ol</Button>
          </Form>
          <div>
          Eğer hesabınız varsa <Link to="/login">Giriş Yap</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
