import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQuery } from 'react-query';
import { TextButton, TextInput } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { UtilService } from '../../../../services';
import { StyledFormWrapper } from '../../../../styles';
import { UpdateConditionSchema, useWindowDimensions } from '../../../../utils';

export const PackageConditionsDrawer: React.FC<{
  closeDrawer: () => void;
}> = ({ closeDrawer }) => {
  const { width } = useWindowDimensions();
  const { mutate: createCondition } = useMutation(UtilService.createPackageCondition);
  const { data: packageData, isLoading: isFetching } = useQuery(['warehouses'], UtilService.fetchConditions);

  const conditions = useMemo(() => packageData?.payload || [], [packageData]);

  return (
    <div className="content">
      <h2 className="header">
        <span>Update Package Conditions</span>
        <TextButton onClick={closeDrawer}>
          <span className="visually-hidden">Close</span>
          <FiX size="24" />
        </TextButton>
      </h2>

      <Formik
        initialValues={{
          packageConditionName: '',
          pricePerKG: '',
        }}
        validationSchema={UpdateConditionSchema}
        onSubmit={(model) => {
          createCondition({ ...model, pricePerKG: +model.pricePerKG });
        }}
      >
        {({ handleSubmit, isValid }) => {
          return (
            <StyledFormWrapper width={width} smaller onSubmit={handleSubmit}>
              <div className="main">
                <TextInput name="packageConditionName" placeholder="Package Condition" />
                <TextInput name="pricePerKG" placeholder="Standard Rate" />
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
        <h3 className="header">Current Package Conditions</h3>
        {isFetching ? (
          <LoaderComponent />
        ) : (
          <ul className="list">
            {conditions.map(({ packageConditionName, id }) => (
              <li key={id}>
                <div className="text">
                  <h4>{packageConditionName}</h4>
                </div>

                <div className="btns">
                  {/* <TextButton>
                    <MdEdit size="14" color="#1DC286" />
                  </TextButton> */}
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
