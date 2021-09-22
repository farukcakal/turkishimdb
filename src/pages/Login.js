import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // trigger loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="Login-Page">
      <div className="Container">
        <div className="Login-Form">
          <h1>Giriş Yap</h1>
          <Form>
            <Form.Field>
              <input
                type="email"
                placeholder="E-Posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <Button
              type="submit"
              onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Giriş Yap
            </Button>
            <div className="Login-Button"></div>
            <Button onClick={signInWithGoogle}>Google ile Giriş Yap</Button>
            <div className="Login-Button"></div>
            <div>
              <Link to="/reset">Şifremi Unuttum</Link>
            </div>
            <div>
              Hesabınız yok mu ? Hemen <Link to="/register">kayıt ol !</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
