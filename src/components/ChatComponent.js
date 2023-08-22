import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ChatComponent.module.css';
import ChatComment from '../components/ChatComment';

const ChatComponent = () => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://djangorestframework-api-38c4a098777a.herokuapp.com/comments/');
      setComments(response.data.results);
      console.log(await axios.get('https://djangorestframework-api-38c4a098777a.herokuapp.com/comments/')) 
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className={styles.container}>
      <p>Latest Comments</p>
      <div className={styles.chatBox}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ChatComment
              key={comment.id}
              profile_id={comment.profile_id}
              profile_image={comment.profile_image}
              owner={comment.owner}
              updated_at={comment.updated_at}
              content={comment.content}
              post={comment.post}
            />
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;