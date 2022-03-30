import React from 'react';

import { firebaseDatabase } from '../services/firebase';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type UseRoomProps = {
  roomId: string | undefined;
};

export const useRoom = ({ roomId }: UseRoomProps) => {
  const [title, setTitle] = React.useState('');
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);

  React.useEffect(() => {
    const roomRef = firebaseDatabase.ref(`/rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          author: value.author,
          content: value.content,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
        }),
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions.reverse());
    });
  }, [roomId]);

  return { title, questions };
};
