import React from 'react';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';

import { useAuth } from '../../hooks/useAuth';
import { firebaseDatabase } from '../../services/firebase';

import './styles.scss';

type RoomParams = {
  roomId: string;
};

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

export const Room = () => {
  const { user } = useAuth();
  const { roomId } = useParams<RoomParams>();

  const [title, setTitle] = React.useState('');
  const [newQuestion, setNewQuestion] = React.useState('');
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

  const onSendQuestion = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (newQuestion.trim() === '') {
        return;
      }

      if (!user) {
        throw new Error('Não autorizado! É necessário fazer login');
      }

      const question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        isAnswered: false,
        isHighlighted: false,
      };

      await firebaseDatabase.ref(`rooms/${roomId}/questions`).push(question);

      setNewQuestion('');
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um problema, tenta novamente mais tarde');
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <RoomCode code={roomId || ''} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length ? (
            <span>{questions.length} pergunta(s)</span>
          ) : null}
        </div>

        <form onSubmit={(event) => onSendQuestion(event)}>
          <textarea
            value={newQuestion}
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
