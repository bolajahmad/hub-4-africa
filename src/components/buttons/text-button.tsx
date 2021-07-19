import { motion, MotionProps } from 'framer-motion';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled, { StyledProps } from 'styled-components';

interface ButtonProps {
  outline?: boolean;
  bordered?: boolean;
  size?: 'small' | 'normal';
}

export const TextButton = styled(motion.button).attrs(() => {
  return {
    whileHover: {
      y: -0.35,
    },
  } as MotionProps;
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: fit-content;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
  cursor: context-menu;
  color: inherit;
  margin: 0;
  background: none;
  border: none;
  font-weight: 600;
  padding: ${({ size = 'normal' }) =>
    size === 'small' ? '0' : size === 'normal' ? '0.5em 1em' : '0.5em 1em'};
  border-radius: 0.5em;
  opacity: 1;
  transition: filter 0.3s ease-out, opacity 0.3s ease-out,
    background-color 0.4s ease-in;
  will-change: filter, opacity, background-color;

  &:focus,
  &:hover {
    filter: saturate(0.8);
    background-color: #efefef;
    opacity: 0.85;
  }

  & > * + * {
    margin-left: 1em;
  }

  &:disabled {
    filter: grayscale(0.85);
    cursor: not-allowed;
  }
`;

const MotionLink: React.FC<
  LinkProps & ButtonProps & { whileHover: MotionProps['whileHover'] }
> = ({ whileHover, ...props }) => {
  return (
    <motion.div whileHover={whileHover}>
      <Link {...props} />
    </motion.div>
  );
};

export const TextLinkButton = styled(TextButton).attrs(
  (): StyledProps<any> => ({ as: MotionLink }),
)<LinkProps & ButtonProps>``;
