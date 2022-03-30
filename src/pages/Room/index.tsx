import React from 'react';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import { firebaseDatabase } from '../../services/firebase';

import './styles.scss';

type RoomParams = {
  roomId: string;
};

export const Room = () => {
  const { roomId } = useParams<RoomParams>();

  const { user } = useAuth();
  const { title, questions } = useRoom({ roomId });

  const [newQuestion, setNewQuestion] = React.useState('');

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
                {console.log(user.avatar)}
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
