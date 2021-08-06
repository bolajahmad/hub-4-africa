import * as Yup from 'yup';

export const UpdateWarehouseSchema = Yup.object().shape({
  warehouseName: Yup.string().required('Warehouse name must be provided'),
  countryId: Yup.string().required('Country must be provided'),
  warehouseCity: Yup.string().required('Warehouse city must be provided'),
  standardRate: Yup.string().required('Please provide rate'),
});

export const UpdateConditionSchema = Yup.object().shape({
  packageCondition: Yup.string().required('package condition must be provided'),
  standardRate: Yup.string().required('Please provide rate'),
});

export const UpdateAdminSchema = Yup.object().shape({
  fullName: Yup.string().required('Please provide admin name'),
  email: Yup.string().email().required('Email must be provided'),
  warehouseId: Yup.string().required('Warehouse must be provided'),
});
