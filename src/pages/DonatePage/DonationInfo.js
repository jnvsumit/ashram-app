import {apiCall} from "../../api/adapter";
import Form, {Types as FormElementTypes} from "../../components/Form/Form";
import React from "react";

const DonationInfo = ({ currencies, donationInfo, donorId, handleDonationSubmit }) => {

    const handleDonationChange = (event) => {
        console.log(event.target.name, event.target.value);
    }

    const razorpayOrderCreate = async ({ razorpayKey, currency, amount, orderId, companyName, companyDescription, companyLogo, donorId }) => {
        const response = await apiCall(`api/donor/${donorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.success) {
            const { data } = response;
            const {name, email, phone} = data;

            const options = {
                key: razorpayKey,
                currency,
                amount,
                order_id: orderId,
                name: companyName,
                description: companyDescription,
                image: companyLogo,
                handler: async function (response) {
                    await handlePaymentVerification({
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature
                    });
                },
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: "#F37254",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
    }

    const handlePaymentVerification = async ({ razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
        const body = JSON.stringify({
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        });

        const response = await apiCall("api/order/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            const { data } = response;
            handleDonationSubmit(data);
        }
    };

    const handleSubmit = async (submittedData) => {
        const body = JSON.stringify({
            amount: submittedData.amount,
            currency: submittedData.currency,
            donorId
        });

        const response = await apiCall("api/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (response.success) {
            const { data } = response;

            await razorpayOrderCreate({
                razorpayKey: data.razorpayKey,
                currency: data.currency,
                amount: data.amount.toString(),
                orderId: data.orderId,
                companyName: data.companyName,
                companyDescription: data.companyDescription,
                companyLogo: data.companyLogo,
                donorId: data.donorId
            });
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            title="MyForm"
            elements={[
                {
                    type: FormElementTypes.SELECT,
                    name: "currency",
                    value: donationInfo.currency,
                    options: currencies.map((currency) => ({ value: currency.code, label: currency.label })),
                    onChange: handleDonationChange,
                    placeholder: "Enter your currency",
                    required: true,
                },
                {
                    type: FormElementTypes.NUMBER,
                    name: "amount",
                    value: donationInfo.amount,
                    onChange: handleDonationChange,
                    placeholder: "Enter your amount",
                    required: true,
                    min: 10,
                }
            ]} />
    );
};

export default DonationInfo;
