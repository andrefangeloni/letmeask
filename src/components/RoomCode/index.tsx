import copy from '../../assets/images/copy.svg';

import './styles.scss';

type RoomCodeProps = {
  code: string;
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const onCopyCode = () => {
    navigator.clipboard.writeText(code)
  };

  return (
    <button className="room-code" onClick={() => onCopyCode()}>
      <div>
        <img src={copy} alt="Copy room code" />
      </div>

      <span>{`Sala #${code}`}</span>
    </button>
  );
};
