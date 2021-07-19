import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ConvertCurrency from '../../../../assets/images/convert-currency.svg';
import LinesBg from '../../../../assets/images/lines-bg.svg';
import OrderCardIcon from '../../../../assets/images/order-card.icon.svg';
import ProductRelease from '../../../../assets/images/product-release.svg';
import ShippingIcon from '../../../../assets/images/shipping-icon.svg';
import { StyledDashboard } from '../../../../styles';
import { useWindowDimensions } from '../../../../utils';

const PageWrapper = styled(StyledDashboard)`
  width: 100%;

  .order-card {
    width: 30em;
    max-width: 30em;
    min-width: 15em;
    padding: 1em 2em;
    border-radius: 22px;
    display: flex;
    align-items: center;
    gap: 1em;
    justify-content: space-around;
    background-color: #0ebe7e;
    background-image: url(${LinesBg});

    .order-icon {
      display: inline-flex;
      width: 4em;
      height: 3em;
      align-items: center;
      justify-content: center;
      padding: 0.5em;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 34.67%, rgba(249, 249, 249, 0.2) 65.33%);
      border-radius: 50%;
    }

    .card-content {
      .header {
        color: #ffffff;
        opacity: 0.7;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          width: 0.5em;
          height: 0.5em;
          padding: 0;
          border-radius: 50%;
          margin-right: 0.5em;
          background: linear-gradient(180deg, #ffd039 34.67%, #ffd039 65.33%);
          transform: matrix(1, 0, 0, -1, 0, 0);
        }
      }

      .text {
        color: white;
        font-size: 1em;
        margin-top: 0.3em;
      }
    }
  }

  .grided-nav {
    margin-top: 2em;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
    gap: 20px;
  }

  .order-nav {
    background-color: white;
    border: 1px solid #eaeaea;
    padding: 1em;
    padding-right: 2em;
    cursor: pointer;

    > * + * {
      margin-top: 1em;
    }

    > .icon {
      width: 5em;
    }

    > h4 {
      font-size: 0.8em;
    }

    > p {
      font-size: 0.67em;
    }
  }
`;

interface ContentProps {
  title: string;
  text: string;
  icon: string;
  link: string;
}

const OrderNavContent: ContentProps[] = [
  {
    title: 'All New Orders',
    text: 'See latest orders update added to the market.',
    icon: ShippingIcon,
    link: '/app/orders/all',
  },
  {
    title: 'Track Order',
    text: 'Track to see where your orders are currently',
    icon: ProductRelease,
    link: '/app/orders/track',
  },
  {
    icon: ConvertCurrency,
    title: 'Update Order Status',
    text: 'Track to see where your orders are currently',
    link: '/app/orders/status',
  },
];

export const OrdersView: React.FC = () => {
  const { width } = useWindowDimensions();

  const history = useHistory();

  return (
    <PageWrapper width={width}>
      <div className="order-card">
        <div className="order-icon">
          <img src={OrderCardIcon} alt="" />
        </div>

        <div className="card-content">
          <div className="header">Process Faster</div>
          <h3 className="text">Increase better experience when you process orders faster.</h3>
        </div>
      </div>

      <div className="grided-nav">
        {OrderNavContent.map(({ title, text, icon, link }, i) => (
          <motion.button
            key={i}
            className="order-nav"
            transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
            onClick={() => history.push(link)}
            whileHover={{
              y: -3,
              x: -2,
              transform: 'scale(1.025)',
              boxShadow: '1px 1px 1px #eaeaea',
            }}
          >
            <div className="icon">
              <img src={icon} alt="" />
            </div>

            <h4 className="bold-8">{title}</h4>
            <p>{text}</p>
          </motion.button>
        ))}
      </div>
    </PageWrapper>
  );
};
