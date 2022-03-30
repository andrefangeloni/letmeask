import { useParams } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';

import { useRoom } from '../../hooks/useRoom';

import './styles.scss';

type RoomParams = {
  roomId: string;
};

export const AdminRoom = () => {
  const { roomId } = useParams<RoomParams>();

  const { title, questions } = useRoom({ roomId });

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />

          <div>
            <RoomCode code={roomId || ''} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length ? (
            <span>{questions.length} pergunta(s)</span>
          ) : null}
        </div>

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
