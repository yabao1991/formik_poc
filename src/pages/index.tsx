import React, { useState } from 'react';
import { Button, Padding, Box, Title, Text, Divider, FormItems } from '@/ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StyledIndex from './styledIndex';
import { phoneRegex } from '../utils/constants';

const { form } = {
  "form": [
      {
          "meta": {
              "title": "Who is the primary contact for this policy?",
              "description": "This person will receive all communications from Newfront about this policy.  You can change this contact information later.  If you're not sure, just add your contact information."
          },
          "data": [
              {
                  "fieldId": "fullName",
                  "label": "Full Name",
                  "type": "text",
                  "required": true,
                  "value": ""
              },
              {
                  "fieldId": "role",
                  "label": "Role",
                  "type": "text",
                  "required": false,
                  "value": ""
              },
              {
                  "fieldId": "phoneNumber",
                  "label": "Phone Number",
                  "type": "text",
                  "required": true,
                  "value": ""
              }
          ]
      },
      {
          "meta": {
              "title": "Tell us about your company"
          },
          "data": [
              {
                  "fieldId": "companyName",
                  "label": "Company name",
                  "type": "text",
                  "required": true
              },
              {
                  "fieldId": "fein",
                  "label": "What is your Federal Employer Identification Number? (FEIN)",
                  "type": "number",
                  "required": true
              },
              {
                  "fieldId": "yearsInBusiness",
                  "label": "Years in Business",
                  "type": "number",
                  "required": false
              },
              {
                  "fieldId": "numberofLocations",
                  "label": "Number of Locations",
                  "type": "number",
                  "required": false
              },
              {
                  "fieldId": "statesOfOperation",
                  "label": "In which states do you operate?",
                  "type": "text",
                  "required": false
              }
          ]
      },
      {
          "meta": {
              "title": "Tell Us About Your Employees"
          },
          "data": [
              {
                  "fieldId": "workInjuryLocation",
                  "label": "What’s the name of the clinic, physician, or ER used for work injuries?",
                  "type": "text",
                  "required": true
              },
              {
                  "fieldId": "medicalInsurance",
                  "label": "Does your group provide medical insurance?",
                  "type": "checkbox",
                  "required": false
              },
              {
                  "fieldId": "retirementPensionPlan",
                  "label": "Do you offer a retirement or pension plan?",
                  "type": "checkbox",
                  "required": false
              },
              {
                  "fieldId": "paidVacation",
                  "label": "Do you give paid vacation?",
                  "type": "checkbox",
                  "required": false,
                  "subFields": [
                      {
                          "fieldId": "paidVacationDetails",
                          "label": "Please provide details about the paid vacation",
                          "type": "text",
                          "required": false
                      }
                  ]
              }
          ]
      },
      {
          "meta": {
              "title": "How do you want to pay for your policy?"
          },
          "data": [
              {
                  "type": "radioGroup",
                  "fieldId": "payment",
                  "required": true,
                  "subFields": [
                      {
                          "label": "I want to pay Newfront",
                          "description": "You'll pay newfront instead of paying each insurance company separately.  There are no fees.",
                          "recommended": true,
                      },
                      {
                          "label": "I want to pay the insurance company directly",
                          "description": "You'll receive bills from the insurance company and it will be your responsibility to make sure they are paid to keep your coverage."
                      }
                  ]
              }
          ]
      }
  ]
};

const UnitHeaderComponent = ({ metaData }) => {
  return (
    <>
      <Title
        style={{
          fontFamily: "'Open Sans',sans-serif",
          fontSize: '20px',
        }}
      >
        <Padding bottom={20}>{metaData.meta.title}</Padding>
      </Title>
      {metaData.meta.description ? (
        <Text
          style={{
            fontFamily: "'Open Sans',sans-serif",
            fontSize: '14px',
          }}
        >
          <Padding bottom={20}>{metaData.meta.description}</Padding>
        </Text>
      ) : null}
    </>
  );
};

const validationSchema = Yup.object({
  step_01: Yup.object().shape({
    fullName: Yup.string().required('fullName is required'),
    phoneNumber: Yup.string().matches(phoneRegex, 'invalid phone').required('phoneNumber is required'),
  }),
  step_02: Yup.object().shape({
    companyName: Yup.string().required('companyName is required'),
    fein: Yup.number().required('FEINtt is required'),
    yearsInBusiness: Yup.number('should be number'),
    numberofLocations: Yup.number('should be number'),
  }),
});

export default function IndexPage(): JSX.Element {
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      console.log('formik.values', formik.values);
      console.log(JSON.stringify(values, null, 2));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [steps, setSteps] = useState([
    {
      key: 'step_01',
      index: 0,
      isDone: true,
    },
    {
      key: 'step_02',
      index: 1,
      isDone: false,
    },
    {
      key: 'step_03',
      index: 2,
      isDone: false,
    },
    {
      key: 'step_04',
      index: 3,
      isDone: false,
    },
  ]);

  const [activeStep, setActiveStep] = useState(steps[0]);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      }),
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      }),
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <StyledIndex>
      <div className="formData">
        Form Data
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        Err
        <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Padding top={40} left={48} right={48} bottom={40}>
          <Box
            style={{
              padding: '0 0 40px 0',
            }}
          >
            <UnitHeaderComponent metaData={form[activeStep.index]} />
            <FormItems config={form[activeStep.index].data} formik={formik} stepNum={activeStep.key} />
          </Box>

          <Divider />

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
            }}
          >
            <Button
              size="secondary"
              onClick={handleBack}
              disabled={steps[0].key === activeStep.key}
              // style={{
              //   width: '90px',
              //   hieght: '40px',
              // }}
            >
              Back
            </Button>
            <Button
              size="primary"
              type={steps[steps.length - 1].key !== activeStep.key ? 'button' : 'submit'}
              onClick={() => (steps[steps.length - 1].key !== activeStep.key ? handleNext() : formik.submitForm())}
              // style={{
              //   width: '90px',
              //   hieght: '40px',
              // }}
            >
              {steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Finish'}
            </Button>
          </Box>
        </Padding>
      </form>
    </StyledIndex>
  );
}
