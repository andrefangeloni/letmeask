import React from 'react';

import { useAuth } from './useAuth';

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
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likeCount: number;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeId: string | undefined;
};

type UseRoomProps = {
  roomId: string | undefined;
};

export const useRoom = ({ roomId }: UseRoomProps) => {
  const { user } = useAuth();

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
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id,
          )?.[0],
        }),
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions.reverse());
    });

    return () => roomRef.off('value');
  }, [roomId, user]);

  return { title, questions };
};
