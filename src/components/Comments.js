import React, { useEffect, useState } from "react";
import { db, doComment, auth } from "../firebase";
import { Card, Input, Button } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Comments = () => {
  const params = useParams();

  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); 
  const [loading, error] = useState("");
  const history = useHistory();

  const Comment = async () => {
    if (!comment) alert("Yorum alanı boş bırakılamaz.");
    await doComment(comment, params.id);
    setComment("");
  };

  const fetchComments = async () => {
    try {
      const query = await db
        .collection("comments")
        .where("params", "==", params.id)
        .get(); 
        const commentArr = []; 
        for (const comment of query.docs) { 
             const commentElement = comment.data(); 
          if (commentElement && commentElement.uid) {
            commentElement.userName = await getUserInfo(commentElement.uid);
          } 
          commentArr.push(commentElement);
        } 
        setComments(commentArr);
    } catch (err) {
      console.error(err);
      console.error("Yorumlar çekilirken hata oluştu.");
    }
  };
  const getUserInfo = async (uid) => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", uid)
        .get();
      const data = query.docs[0].data(); 
      return data.name;
    } catch (err) {
      console.log(err);
      return "";
    }
  };
  useEffect(() => {
    if (loading) return;
    if (comment) history.replace();
    fetchComments();
    //console.log(params.id);
  }, [params]);
  return (
    <div className="Comments">
      <h2>Yorumlar</h2>
      <Card fluid>
        <div className="Comment">
          {comments?.map((comment) => (<div>{comment.userName + ": " + comment.comment}</div>))}
        </div>
        <br />
        <Input
          placeholder="Yorum Yap.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={Comment}>Yorum Yap</Button>
      </Card>
    </div>
  );
};
export default Comments;
