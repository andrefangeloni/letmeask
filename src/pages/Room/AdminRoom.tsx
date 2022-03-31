import { useParams, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import deleteIcon from '../../assets/images/delete.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';

import { useRoom } from '../../hooks/useRoom';

import { firebaseDatabase } from '../../services/firebase';

import './styles.scss';

type RoomParams = {
  roomId: string;
};

export const AdminRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<RoomParams>();

  const { title, questions } = useRoom({ roomId });

  const onEndRoom = async () => {
    await firebaseDatabase.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    navigate('/');
  };

  const onDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await firebaseDatabase
        .ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />

          <div>
            <RoomCode code={roomId || ''} />
            <Button isOutlined onClick={() => onEndRoom()}>
              Encerrar sala
            </Button>
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
            >
              <button
                type="button"
                onClick={() => onDeleteQuestion(question.id)}
              >
                <img src={deleteIcon} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};
