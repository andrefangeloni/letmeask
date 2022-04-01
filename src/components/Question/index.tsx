import React from 'react';

import classNames from 'classnames';

import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children?: React.ReactNode;
};

export const Question = ({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => (
  <div
    className={classNames(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted && !isAnswered },
    )}
  >
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div>{children}</div>
    </footer>
  </div>
);
