import React, { useState, useEffect } from "react";
import client, {
  Databases,
  DATABASES_ID,
  COLLECTION_ID_MESSAGES,
  databases,
} from "../appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { Trash2 } from "react-feather";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  useEffect(() => {
    getMessages();
    const unsubscibe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => {
      unsubscibe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [Permission.write(Role.user(user.$id))];

    let response = await databases.createDocument(
      DATABASES_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    // setMessages((prevState) => [response, ...prevState]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc("$createdAt"),
        //   Query.limit(2)
      ]
    );
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASES_ID, COLLECTION_ID_MESSAGES, message_id);
    // setMessages((prevState) =>
    //   messages.filter((message) => message.$id !== message_id)
    // );
  };

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              maxLength={1000}
              required
              placeholder="say something"
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span>{message.username}</span>
                  ) : (
                    <span>Anonymous user</span>
                  )}
                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </p>

                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`
                ) && (
                  <Trash2
                    className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>

              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
