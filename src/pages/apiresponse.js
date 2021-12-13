/* eslint-disable prettier/prettier */
export default {
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
}
