import * as Yup from 'yup';

export const UpdateWarehouseSchema = Yup.object().shape({
  warehouseName: Yup.string().required('Warehouse name must be provided'),
  warehouseCity: Yup.string().required('Warehouse city must be provided'),
  standardRate: Yup.string().required('Please provide rate'),
});
