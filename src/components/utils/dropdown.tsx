import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useOnClickOutside } from '../../utils';

const Wrapper = styled.div`
  border: none;
  overflow: visible;
  position: relative;
  min-height: fit-content;

  .dropdown-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: fit-content;
    padding: 10px 20px;
    font-weight: 500;
    cursor: context-menu;
    background-color: #f9f9f9;
    border-radius: 3px;

    span {
      flex: 1;
    }

    .icon {
      flex: 0;
      border-left: 1px solid #f9f9f9;
      background: #f9f9f9;
    }
  }
`;

export const CustomDropdownItem = styled.button`
  display: flex;
  justify-items: flex-start;
  width: 100%;
  padding: 1em;
  background: transparent;
  border: none;
  font-size: 14px;
  color: black;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.02);
    color: #00a159;
  }

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;

const CustomDropdownMenu = styled.div`
  background: #ffffff;
  position: absolute;
  box-shadow: 0px 1px 6px #00000029;
  border-radius: 7px;
  border: none;
  opacity: 1;
  width: 100%;
  z-index: 100;
  min-width: 120px;
  right: 0;
`;

interface Props {
  triggerComponent: React.ComponentType;
  className?: string;
  withCaret?: boolean;
}

export const CustomDropdown: React.FC<Props> = ({
  className,
  triggerComponent: TriggerComponent,
  withCaret = true,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((prevState) => !prevState);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <Wrapper onClick={toggle} className={className} ref={ref}>
      <div className="dropdown-btn">
        {<TriggerComponent />}
        {withCaret && <span className="icon">{!isOpen ? <RiArrowDownSLine /> : <RiArrowUpSLine />}</span>}
      </div>
      <CustomDropdownMenu>{isOpen && children}</CustomDropdownMenu>
    </Wrapper>
  );
};
