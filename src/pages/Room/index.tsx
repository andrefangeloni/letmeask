import logo from '../../assets/images/logo.svg';

import { Button } from '../../components/Buttons';

import './style.scss';

export const Room = () => (
  <div id="page-room">
    <header>
      <div className="content">
        <img src={logo} alt="Letmeask" />
        <div>código da sala</div>
      </div>
    </header>

    <main>
      <div className="room-title">
        <h1>Sala React</h1>
        <span>4 perguntas</span>
      </div>

      <form>
        <textarea placeholder="O que você quer perguntar?" />

        <div className="form-footer">
          <span>
            Para enviar uma pergunta, <button>faça seu login</button>
          </span>

          <Button type="submit">Enviar pergunta</Button>
        </div>
      </form>
    </main>
  </div>
);
