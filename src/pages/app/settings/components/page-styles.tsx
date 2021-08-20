import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from '../../../../utils';

export const SettingsPageWrapper = styled(motion.div)`
  width: 100%;
  font-size: 1rem;
  padding: 1.5em 2.5em;
  position: relative;
  transition: font-size 0.25 cubic-bezier(0.785, 0.135, 0.15, 0.86);

  > .container {
    width: 100%;

    > .list {
      width: 100%;
      background-color: white;
      border-radius: 16px;
      box-shadow: 0px 4px 16px rgba(234, 234, 234, 0.36);
      padding: 1.5em 1.5em 2.5em;

      .list-item {
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0;
        padding: 1em 0em;

        .text {
          flex: 1;
          max-width: 50%;
          color: #130f26;

          h3 {
            font-size: 1.5em;
            font-weight: 700;
          }

          p {
            font-weight: 600;
            margin-top: 1.5em;
            color: #808081;
          }
        }

        .btn-box {
          width: 10em;

          button {
            width: 100%;
            vertical-align: middle;
            display: inline-block;
            padding: 1em;
            font-weight: 800;
            font-size: 0.9em;
            color: white;
            cursor: pointer;
            border: none;
            outline: none;
            background: #2f878a;
            border-radius: 3px;
            transition: box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            will-change: box-shadow;

            &:focus,
            &:hover {
              box-shadow: 1px 1px 10px 4px #808980ad inset;
            }
          }
        }
      }
    }
  }

  ${devices.phoneM} {
    > .container {
      > .list .list-item {
        display: block;

        > * + * {
          margin-top: 1.5em;
        }

        .text {
          max-width: 100%;
        }
      }
    }
  }
`;
