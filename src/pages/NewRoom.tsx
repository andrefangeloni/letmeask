import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.svg';
import illustration from '../assets/images/illustration.svg';

import { Button } from '../components/Buttons';

import '../styles/auth.scss';

export const NewRoom = () => (
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
        <h2>Criar uma sala</h2>

        <form>
          <input type="text" placeholder="Nome da sala" />
          <Button type="submit">Criar sala</Button>
        </form>

        <p>
          Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
        </p>
      </div>
    </main>
  </div>
);
