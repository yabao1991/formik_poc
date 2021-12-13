import React, { useMemo } from 'react';
import { Button, Padding, Box, Card, Field, Input, Checkbox, CheckboxRow, RadioButton, RadioButtonGroup, Title, Text, Divider } from '@/ui';
import { Formik, Form, useFormik, Field as Field_formik, useField } from 'formik';

const FormItems = ({ config, formik, stepNum }) => {
    const builder = (individualConfig) => {
        switch (individualConfig.type) {
            case 'text':
            case 'number':
                return (
                    <Padding key={individualConfig.fieldId} bottom={16}>
                        <Field fieldId={individualConfig.fieldId} label={individualConfig.label}>
                            <input
                                name={`${stepNum}.${individualConfig.fieldId}`}
                                id={individualConfig.fieldId}
                                type={individualConfig.type}
                                style={{ ...individualConfig.style }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values[individualConfig.fieldId]}
                            />
                        </Field>
                        {formik.errors[stepNum] && formik.errors[stepNum][individualConfig.fieldId] && <Field error={formik.errors[stepNum][individualConfig.fieldId]} />}
                    </Padding>
                );
            case 'checkbox':
                return (
                    <>
                        <Padding key={individualConfig.fieldId} bottom={16}>
                            <label>
                                <input
                                    name={`${stepNum}.${individualConfig.fieldId}.selected`}
                                    type={individualConfig.type}
                                    id={individualConfig.fieldId}
                                    value={formik.values[individualConfig.fieldId]}
                                    onClick={formik.handleChange}
                                    onChange={formik.handleChange}
                                    style={{ ...individualConfig.style }}
                                />
                                {individualConfig.label}
                            </label>
                        </Padding>
                        {individualConfig.fieldId === "paidVacation" && formik.values['step_03'] && formik.values['step_03'].paidVacation?.selected && (
                            <Padding key={individualConfig.subFields[0].fieldId} bottom={16}>
                                <Field fieldId={individualConfig.subFields[0].fieldId} label={individualConfig.subFields[0].label}>
                                    <input
                                        name={`${stepNum}.paidVacation.paidVacationDetails`}
                                        id={individualConfig.subFields[0].fieldId}
                                        type={individualConfig.subFields[0].type}
                                        style={{ ...individualConfig.subFields[0].style }}
                                        onChange={formik.handleChange}
                                        value={formik.values['paidVacation']?.paidVacationDetails}
                                    />
                                </Field>
                                {formik.errors[stepNum] && formik.errors[stepNum][individualConfig.fieldId] && <Field error={formik.errors[stepNum][individualConfig.fieldId]} />}
                            </Padding>
                        )}
                        {formik.errors[stepNum] && [individualConfig.fieldId] && <Field error={formik.errors[stepNum][individualConfig.fieldId]} />}
                    </>
                );
            case 'radioGroup':
                return (
                    <>
                        <Padding key={individualConfig.fieldId} bottom={8}>

                            {individualConfig.subFields.map((item, index) => {
                                return (
                                    <label key={`${individualConfig.fieldId}-${index}`}>

                                        <Box style={{
                                            background: "#FFFFFF",
                                            border: "1px solid #DBDBDB",
                                            boxSizing: "border-box",
                                            borderRadius: "6px",
                                            width: "540px",
                                            height: "auto",
                                            padding: "20px",
                                            marginBottom: '20px'
                                        }}>
                                            <input
                                                type="radio"
                                                name={`${stepNum}.${individualConfig.fieldId}`}
                                                onClick={formik.handleChange}
                                                value={item.label}
                                            />
                                            {item.label}
                                            <br />
                                            <p style={{
                                                fontFamily: "'Open Sans',sans-serif",
                                                fontSize: "14px",
                                                color: "#3D464D",
                                                marginTop: "2px",
                                                marginLeft: "20px",
                                            }}>{item.description}</p>

                                            {item.recommended && <p style={{
                                                fontWeight: 600,
                                                fontFamily: "'Open Sans',sans-serif",
                                                fontSize: "10px",
                                                lineHeight: "24px",
                                                textAlign: "center",
                                                color: "#1CB779",
                                                width: "99px",
                                                height: "24px",
                                                background: "#E5FCF3",
                                                borderRadius: "3px",
                                                marginLeft: "20px",
                                                marginTop: "16px",
                                            }}>RECOMMENDED</p>}
                                        </Box>
                                    </label>

                                )
                            })}
                        </Padding>
                        {formik.errors[stepNum] && formik.errors[stepNum][individualConfig.fieldId] && <Field error={formik.errors[stepNum][individualConfig.fieldId]} />}
                    </>
                );
            default:
                return <div>Not a supported field</div>
        }
    }

    return (
        <>
            {config.map((c) => {
                return builder(c);
            })}
        </>
    );
};

export default FormItems;