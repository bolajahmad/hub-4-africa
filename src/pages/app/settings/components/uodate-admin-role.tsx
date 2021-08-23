import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SelectInput, TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { Admins } from '../../../../models/admins';
import { DashboardService, UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import { generateID, NotificationType, UpdateAdminSchema } from '../../../../utils';

export const AdminRoleDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { addNotification } = useNotificationContext()!;
  const { mutate: createAdmin, isLoading: isSubmitting, isError, error } = useMutation(DashboardService.createAdmin);
  const { data: adminData, isLoading } = useQuery(['admins'], DashboardService.getAdmins);
  const { data: warehouseData } = useQuery(['warehouses'], UtilService.fetchWarehouse);
  const warehouses = useMemo(() => warehouseData?.payload || [], [warehouseData]);
  const admins = useMemo(() => adminData?.payload || [], [adminData]);
  const [isEditing, setEditing] = useState<Admins | undefined>();
  const queryClient = useQueryClient();

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
              fullName: isEditing.fullName,
              email: isEditing.email,
              phoneNumber: isEditing.phoneNumber,
              warehouseId: isEditing.warehouse.id,
              password: '',
            } :
            {
              fullName: '',
              email: '',
              warehouseId: '',
              phoneNumber: '',
              password: '',
            }
        }
        enableReinitialize
        validationSchema={UpdateAdminSchema}
        onSubmit={(model, { resetForm }) => {
          model.password = generateID(10) as string;
          createAdmin(model, {
            onSuccess: ({ message }) => {
              queryClient.invalidateQueries('admins');
              resetForm();
              setEditing(undefined);
              addNotification(NotificationType.SUCCESS, message);
            },
          });
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper smaller onSubmit={handleSubmit}>
              <div className="main">
                <TextInput name="fullName" placeholder="Full Name" />
                <TextInput name="email" placeholder="Email Address" />
                <TextInput type="tel" name="phoneNumber" placeholder="Phone Number" />
                {warehouses?.length ? (
                  <SelectInput
                    name="warehouseId"
                    options={warehouses}
                    valueProp="id"
                    displayProp="state"
                    placeholder="Assigned Warehouse"
                  />
                ) : null}
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
        <h3 className="header">All Admins</h3>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <ul className="list" style={{ maxHeight: '15em' }}>
            {admins.map((admin) => (
              <li key={admin.id}>
                <div className="text">
                  <h4>{admin.fullName}</h4>
                </div>

                <div className="btns">
                  <TextButton onClick={() => setEditing(admin)}>
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
