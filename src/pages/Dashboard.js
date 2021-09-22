import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../firebase";
import { Button } from "semantic-ui-react";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Profil bilgileri çekilirken sorun oluştu.");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="Container">
      <div className="Dashboard">
        Bilgilerim
        <div className="Profile-Info">{name}</div>
        <div className="Profile-Info">{user?.email}</div>
        <Button onClick={logout}>Çıkış Yap</Button>
      </div>
    </div>
  );
}
export default Dashboard;
