import logo from '../assets/images/logo.svg';
import google from '../assets/images/google-icon.svg';
import illustration from '../assets/images/illustration.svg';

import { Button } from '../components/Buttons';

import '../styles/auth.scss';

export const Home = () => (
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
        <button className="create-room">
          <img src={google} alt="Logo do Google" />
          Crie sua sala com o Google
        </button>
        <div className="separator">ou entre em uma sala</div>

        <form>
          <input type="text" placeholder="Digite o código da sala" />
          <Button type="submit">
            Entrar na sala
          </Button>
        </form>
      </div>
    </main>
  </div>
);