import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {  Link, useHistory } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
      if (loading) return;
      if (user) history.replace("/dashboard");
    }, [user, loading]);
  return (
    <div className="Login-Page">
      <div className="Container">
        <div className="Login-Form">
        <h1>Şifremi Unuttum</h1>
          <Form>
            <Form.Field>
              <input
                type="text"
                className="register__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
              />
            </Form.Field>
            <Button onClick={() => sendPasswordResetEmail(email)}>Şifremi Sıfırla</Button>
          </Form>
          <div>
          Eğer hesabınız varsa <Link to="/login">Giriş Yap</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
