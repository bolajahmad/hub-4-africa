import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import { NotificationType, UpdateWarehouseSchema, useWindowDimensions } from '../../../../utils';

export const WarehouseDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { addNotification } = useNotificationContext()!;
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const { mutate: addWarehouse } = useMutation(UtilService.createWarehouse, {
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries('warehouses');
      addNotification(NotificationType.SUCCESS, message);
    },
  });
  const { data: warehouseData, isLoading: isFetching } = useQuery(['warehouses'], UtilService.fetchWarehouse);
  const { data: countriesData } = useQuery(['countries'], UtilService.fetchCountries);

  const countries = useMemo(
    () => (countriesData?.payload || []) as { countryName: string; id: string }[],
    [countriesData]
  );
  const warehouses = useMemo(() => warehouseData?.payload || [], [warehouseData]);

  return (
    <div className="content">
      <h2 className="header">
        <span>Update Warehouse</span>
        <TextButton onClick={closeDrawer}>
          <span className="visually-hidden">Close</span>
          <FiX size="24" />
        </TextButton>
      </h2>

      <Formik
        initialValues={{
          stateName: '',
          address: '',
          countryId: '',
          pricePerKg: '',
        }}
        validationSchema={UpdateWarehouseSchema}
        onSubmit={(model) => {
          addWarehouse({ ...model, pricePerKG: +model.pricePerKg });
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper width={width} smaller onSubmit={handleSubmit}>
              <div className="main">
                <TextInput name="stateName" placeholder="WareHouse Name" />
                <TextInput name="address" placeholder="WareHouse City" />
                <SelectInput
                  options={countries}
                  displayProp="countryName"
                  valueProp="id"
                  placeholder="Warehouse Country"
                  name="countryId"
                />
                <TextInput name="pricePerKg" placeholder="Standard Rate" />
              </div>

              <div className="footer mt-4">
                <div>
                  <button type="submit" disabled={!isValid} className="submit__btn">
                    Update
                  </button>
                </div>
              </div>
            </StyledFormWrapper>
          );
        }}
      </Formik>

      <div className="list-wrapper">
        <h3 className="header">All Warehouses</h3>
        {isFetching ? (
          <LoaderComponent />
        ) : (
          <ul className="list">
            {warehouses.map((warehouse) => (
              <li key={warehouse.id}>
                <div className="text">
                  <h4>{warehouse.state}&nbsp;Warehouse</h4>
                  <span>{warehouse.address}</span>
                </div>

                <div className="btns">
                  <TextButton>
                    <MdEdit size="14" color="#1DC286" />
                  </TextButton>
                  <TextButton>
                    <MdDelete size="14" color="#e02e2e" />
                  </TextButton>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
