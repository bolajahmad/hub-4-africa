import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import { UpdateWarehouseSchema, useWindowDimensions } from '../../../../utils';

export const WarehouseDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { width } = useWindowDimensions();
  const { mutate: addWarehouse } = useMutation(UtilService.createWarehouse);
  const { data: warehouseData, isLoading: isFetching } = useQuery(['warehouses'], UtilService.fetchWarehouse);
  const { data: countriesData } = useQuery(['countries'], UtilService.fetchCountries);

  const countries = useMemo(
    () => (countriesData?.payload || []) as { countryName: string; id: string }[],
    [countriesData],
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
          warehouseName: '',
          warehouseCity: '',
          countryId: '',
          pricePerKg: '',
        }}
        validationSchema={UpdateWarehouseSchema}
        onSubmit={(model) => {
          addWarehouse(model);
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper width={width} smaller onSubmit={handleSubmit}>
              <div className="main">
                <TextInput name="warehouseName" placeholder="WareHouse Name" />
                <TextInput name="warehouseCity" placeholder="WareHouse City" />
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
            {warehouses.map(({ address, id, state }) => (
              <li key={id}>
                <div className="text">
                  <h4>{state}&nbsp;Warehouse</h4>
                  <span>{address}</span>
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
