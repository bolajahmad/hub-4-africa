import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { Admins } from '../../../../models/admins';
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
  const { data: adminData, isLoading } = useQuery(
    ['admins'],
    DashboardService.getAdmins
  );
  const { data: warehouseData } = useQuery(
    ['warehouses'],
    UtilService.fetchWarehouse
  );
  const warehouses = useMemo(
    () => warehouseData?.payload || [],
    [warehouseData]
  );
  const admins = useMemo(() => adminData?.payload || [], [adminData]);

  const [isEditing, setEditing] = useState<Admins | undefined>();

  console.log({ isEditing, warehouses });

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
        initialValues={
          isEditing ?
            {
              ...isEditing,
              warehouseId: isEditing.warehouse.id as string,
            } :
            {
              fullName: '',
              email: '',
              warehouseId: '',
              password: '',
            }
        }
        enableReinitialize
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
                {warehouses?.length ? (
                  <SelectInput
                    name="warehouseId"
                    options={warehouses}
                    valueProp="state"
                    displayProp="address"
                    placeholder={
                      isEditing ?
                        isEditing.warehouse.address +
                          ',' +
                          isEditing.warehouse.state :
                        'Assigned Warehouse'
                    }
                  />
                ) : null}
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
        <h3 className="header">All Admins</h3>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <ul className="list">
            {admins.map((admin) => (
              <li key={admin.id}>
                <div className="text">
                  <h4>{admin.fullName}</h4>
                </div>

                <div className="btns">
                  <TextButton onClick={() => setEditing(admin)}>
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
