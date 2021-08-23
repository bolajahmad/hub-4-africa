import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { WarehouseModel } from '../../../../models';
import { UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import { NotificationType, UpdateWarehouseSchema } from '../../../../utils';

export const WarehouseDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { addNotification } = useNotificationContext()!;
  const [editing, setEditing] = useState<WarehouseModel | undefined>();
  const queryClient = useQueryClient();
  const { mutate: addWarehouse, isLoading: isSubmitting, error, isError } = useMutation(UtilService.createWarehouse);
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
        initialValues={
          editing ?
            {
              id: editing.id,
              stateName: editing.state,
              address: editing.address,
              pricePerKg: editing.pricePerKG.toString(),
              countryId: editing.country.id,
            } :
            {
              stateName: '',
              address: '',
              countryId: '',
              pricePerKg: '',
            }
        }
        enableReinitialize
        validationSchema={UpdateWarehouseSchema}
        onSubmit={(model, { resetForm }) => {
          addWarehouse(
            { ...model, pricePerKG: +model.pricePerKg },
            {
              onSuccess: ({ message }) => {
                queryClient.invalidateQueries('warehouses');
                resetForm();
                setEditing(undefined);
                addNotification(NotificationType.SUCCESS, message);
              },
            }
          );
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper smaller onSubmit={handleSubmit}>
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

              {isError && <div className="error-message">{(error as any)?.message}</div>}

              <div className="footer mt-4">
                <div>
                  <button type="submit" disabled={!isValid} className="submit__btn">
                    {isSubmitting ? <LoaderComponent /> : 'Update'}
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
          <ul className="list" style={{ maxHeight: '13em' }}>
            {warehouses.map((warehouse) => (
              <li key={warehouse.id}>
                <div className="text">
                  <h4>{warehouse.state}&nbsp;Warehouse</h4>
                  <span>{warehouse.address}</span>
                </div>

                <div className="btns">
                  <TextButton onClick={() => setEditing(warehouse)}>
                    <MdEdit size="14" color="#1DC286" />
                  </TextButton>
                  {/* <TextButton>
                    <MdDelete size="14" color="#e02e2e" />
                  </TextButton> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
