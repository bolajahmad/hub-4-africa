import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { CopyCard, CustomDropdown, CustomDropdownItem, LoaderComponent } from '../../../../components/utils';
import { OrdersModel, OrderStatsModel, OrderStatsType } from '../../../../models';
import { UtilService } from '../../../../services';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard, StyledProgressWrapper } from '../../../../styles';
import { useWindowDimensions } from '../../../../utils';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const { width } = useWindowDimensions();

  const { data: statsData, isLoading: loadingStats } = useQuery(['order-stats'], DashboardService.fetchOrderStats);
  const { data: statusData } = useQuery(['order-status'], UtilService.fetchOrderStatus);
  const { data: ordersData, isLoading } = useQuery(['orders'], DashboardService.fetchAllOrders);

  const stats = useMemo(() => {
    if (statsData && statsData.payload) {
      const actualData = Object.keys(statsData.payload).map((key) => {
        const data = dashboardStats.find(({ id }) => id === key) as OrderStatsModel;

        return {
          ...data,
          value: statsData.payload ? statsData.payload[key as OrderStatsType] : 0,
        };
      });

      return actualData;
    } else {
      return dashboardStats;
    }
  }, [statsData]);
  const orders = useMemo(() => (ordersData?.payload ?? []) as OrdersModel[], [ordersData]);
  const status = useMemo(() => (statusData?.payload ?? []) as { id: string; name: string }[], [statusData]);

  return (
    <Wrapper width={width}>
      <div className="stats-box">
        {stats.map((props) => (
          <StatsBox key={props.id} {...props} isLoading={loadingStats} />
        ))}
      </div>

      <div className="table-wrapper">
        <div className="bold-8">Shipment History</div>

        {isLoading ? (
          <div className="centered">
            <LoaderComponent />
          </div>
        ) : (
          <PrimaryTable
            collectionName="Shipment history"
            data={orders}
            columns={[
              {
                Header: 'Tracking NO.',
                accessor: ({ id }: OrdersModel) => (
                  <React.Fragment>
                    <CopyCard data-tip={id} data-for={id} title={id} text="Copy Number" />
                    <ReactTooltip id={id} className="tooltip" place="bottom">
                      <p style={{ fontWeight: 400, color: 'white', maxWidth: 200 }}>{id} </p>
                    </ReactTooltip>
                  </React.Fragment>
                ),
              },
              {
                Header: 'Delivery Location',
                accessor: ({ pickupLocalGovt, pickupState }: OrdersModel) => (
                  <span>
                    {pickupLocalGovt}, {pickupState}
                  </span>
                ),
              },
              { Header: 'Receiver\'s Name', accessor: 'receiverName' },
              {
                Header: 'Progress Status',
                accessor: () => (
                  <StyledProgressWrapper>
                    <div className="circle"></div>
                    Ready for Delivery
                  </StyledProgressWrapper>
                ),
              },
              {
                Header: 'Update Status',
                accessor: () => (
                  <CustomDropdown triggerComponent={() => <span>In Progress</span>}>
                    {status.map(({ name, id }) => (
                      <CustomDropdownItem className="capitalize" key={id}>
                        {name.split('_').join(' ')}
                      </CustomDropdownItem>
                    ))}
                  </CustomDropdown>
                ),
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};
