import React from 'react';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import { Button } from '../../components/Buttons';
import { RoomCode } from '../../components/RoomCode';

import { useAuth } from '../../hooks/useAuth';
import { firebaseDatabase } from '../../services/firebase';

import './style.scss';

type RoomParams = {
  roomId: string;
};

export const Room = () => {
  const { user } = useAuth();
  const { roomId } = useParams<RoomParams>();

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
        isHighlighted: false,
        isAnswered: false,
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
          <h1>Sala React</h1>
          <span>4 perguntas</span>
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
      </main>
    </div>
  );
};
