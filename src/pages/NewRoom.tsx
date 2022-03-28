import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.svg';
import illustration from '../assets/images/illustration.svg';

import { Button } from '../components/Buttons';

import { useAuth } from '../hooks/useAuth';

import { firebaseDatabase } from '../services/firebase';

import '../styles/auth.scss';

export const NewRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newRoom, setNewRoom] = React.useState('');

  const handleCreateRoom = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = firebaseDatabase.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${firebaseRoom.key}`);
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
          {/* <h1>{user?.name || 'Usuário'}</h1> */}
          <h2>Criar uma sala</h2>

          <form onSubmit={(event) => handleCreateRoom(event)}>
            <input
              type="text"
              value={newRoom}
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
