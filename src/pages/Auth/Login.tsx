import React from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import google from '../../assets/images/google-icon.svg';
import illustration from '../../assets/images/illustration.svg';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import { firebaseDatabase } from '../../services/firebase';

import './auth.scss';

export const Login = () => {
  const navigate = useNavigate();

  const { user, onGoogleSignIn } = useAuth();

  const [roomCode, setRoomCode] = React.useState('');

  const onLogin = async () => {
    if (!user) {
      await onGoogleSignIn();
    }

    navigate('/rooms/new');
  };

  const onJoinRoom = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (roomCode.trim() === '') {
        throw new Error('Digite o código da sala');
      }

      const roomRef = await firebaseDatabase.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
        throw new Error('Sala não encontrada');
      }

      navigate(`/rooms/${roomCode}`);
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <button className="create-room" onClick={() => onLogin()}>
            <img src={google} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={(event) => onJoinRoom(event)}>
            <input
              type="text"
              value={roomCode}
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
