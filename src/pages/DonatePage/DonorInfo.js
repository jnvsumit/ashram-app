import Form, {Types as FormElementTypes} from "../../components/Form/Form";
import React from "react";
import {apiCall} from "../../api/adapter";

const DonorInfo = ({ donorInformation, handleDonorSubmit }) => {

    const handleDonorChange = (event) => {
        console.log(event.target.name, event.target.value);
    }

    const handleSubmit = async (submittedData) => {
        const body = JSON.stringify({
            name: submittedData.name,
            email: submittedData.email,
            phone: submittedData.phone,
            address: submittedData.address,
            city: submittedData.city,
            state: submittedData.state,
            postalCode: submittedData.postalCode,
            country: submittedData.country
        });

        const response = await apiCall("api/donor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            const { data } = response;
            handleDonorSubmit(data);
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            title="MyForm"
            elements={[
                {
                    type: FormElementTypes.FILE,
                    name: "name",
                    value: donorInformation.name,
                    acceptMultiple: true,
                    onChange: handleDonorChange,
                    placeholder: "Enter your name",
                    required: true,
                },
                {
                    type: FormElementTypes.EMAIL,
                    name: "email",
                    value: donorInformation.email,
                    onChange: handleDonorChange,
                    placeholder: "Enter your email",
                    required: true,
                },
                {
                    type: FormElementTypes.TEL,
                    name: "phone",
                    value: donorInformation.phone,
                    onChange: handleDonorChange,
                    placeholder: "Enter your phone number",
                    required: true,
                },
                {
                    type: FormElementTypes.TEXT,
                    name: "address",
                    value: donorInformation.address,
                    onChange: handleDonorChange,
                    placeholder: "Enter your address"
                },
                {
                    type: FormElementTypes.TEXT,
                    name: "city",
                    value: donorInformation.city,
                    onChange: handleDonorChange,
                    placeholder: "Enter your city"
                },
                {
                    type: FormElementTypes.TEXT,
                    name: "postalCode",
                    value: donorInformation.postalCode,
                    onChange: handleDonorChange,
                    placeholder: "Enter your postal code"
                },
                {
                    type: FormElementTypes.TEXT,
                    name: "state",
                    value: donorInformation.state,
                    onChange: handleDonorChange,
                    placeholder: "Enter your state"
                },
                {
                    type: FormElementTypes.TEXT,
                    name: "country",
                    value: donorInformation.country,
                    onChange: handleDonorChange,
                    placeholder: "Enter your country"
                },
            ]} />
    );
};

export default DonorInfo;
