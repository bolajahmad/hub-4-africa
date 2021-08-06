import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { DashboardService, UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import {
  generateID,
  UpdateAdminSchema,
  useWindowDimensions,
} from '../../../../utils';

export const AdminRoleDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { width } = useWindowDimensions();
  const { mutate: createAdmin, isLoading: isSubmitting } = useMutation(
    DashboardService.createAdmin
  );
  const { data: packageData, isLoading } = useQuery(
    ['package-conditions'],
    UtilService.fetchConditions
  );
  const { data: warehouseData } = useQuery(
    ['warehouses'],
    UtilService.fetchWarehouse
  );
  const warehouses = useMemo(
    () => warehouseData?.payload || [],
    [warehouseData]
  );
  const conditions = useMemo(() => packageData?.payload || [], [packageData]);

  return (
    <div className="content">
      <h2 className="header">
        <span>Add an Admin</span>
        <TextButton onClick={closeDrawer}>
          <span className="visually-hidden">Close</span>
          <FiX size="24" />
        </TextButton>
      </h2>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          warehouseId: '',
          password: '',
        }}
        validationSchema={UpdateAdminSchema}
        onSubmit={(model) => {
          model.password = generateID(10) as string;
          createAdmin(model);
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper width={width} smaller onSubmit={handleSubmit}>
              <div className="main">
                <TextInput name="fullName" placeholder="Full Name" />
                <TextInput name="email" placeholder="Email Address" />
                <SelectInput
                  name="warehouseId"
                  options={warehouses}
                  valueProp="state"
                  displayProp="address"
                  placeholder="Assigned Warehouse"
                />
              </div>

              <div className="footer mt-4">
                <div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="submit__btn"
                  >
                    {isSubmitting ? <LoaderComponent /> : 'Update'}
                  </button>
                </div>
              </div>
            </StyledFormWrapper>
          );
        }}
      </Formik>

      <div className="list-wrapper">
        <h3 className="header">Current Package Conditions</h3>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <ul className="list">
            {conditions.map(({ packageConditionName, id }) => (
              <li key={id}>
                <div className="text">
                  <h4>{packageConditionName}</h4>
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
