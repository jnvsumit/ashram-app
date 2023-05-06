import React, {useEffect, useState} from "react";
import {
    DonateContainer,
    DonateTitle,
    DonateDescription
} from "./DonatePage.styles";
import { apiCall } from "../../api/adapter";
import DonorInfo from "./DonorInfo";
import DonationInfo from "./DonationInfo";
import Switch from "../../components/Input/Switch/Switch";
import File from "../../components/Input/File/File";
import Text, {Types as TextInputTypes} from "../../components/Input/Text/Text";
import CheckboxGroup from "../../components/Input/Checkbox/Checkbox";
import DataListInput from "../../components/Input/DataList/DataList";
import Formp, {ComponentTypes, InputTypes} from "../../components/Form/Formp";
import TextEditor from "../../components/TextEditor/TextEditor";

const INITIAL_DONOR_INFO = {
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
};

const INITIAL_DONATION_INFO = {
    currency: "INR",
    amount: 10
};

const DonatePage = () => {
    const [donorId, setDonorId] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const [step, setStep] = useState(1);

    const handleDonorSubmit = async (data) => {
        setDonorId(data.donorId);
        setStep(2);
    };

    const handleDonationSubmit = async (data) => {
        setStep(3);
    };

    useEffect(() => {
            const getCurrencies = async () => {
                const response = await apiCall("api/currency", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.success) {
                    const {data} = response;
                    setCurrencies(data.map((currency) => {
                        return {
                            code: currency.code,
                            label: currency.name + " (" + currency.symbol + ")"
                        }
                    }));
                }
            }

            getCurrencies();
        }, []);

    const [checked, setChecked] = useState(true);
    const [editorData, setEditorData] = useState("");

    return (
        <>
            <DonateContainer>
                <DonateTitle>Donate to Support Our Cause</DonateTitle>
                <DonateDescription>
                    Your generous contribution helps us continue our mission to bring
                    education and resources to those in need. Thank you for your support!
                </DonateDescription>
                {
                    <Switch onChange={(e) => setChecked(!checked)} checked={checked} />
                }
                {
                    <TextEditor
                        isEditorEnabled={checked}
                        value={editorData}
                        onChange={
                            (data) => {
                                setEditorData(data);
                                console.log(data);
                            }
                        }
                    />
                }
                {
                    <File accept="*" onChange={()=> {}} />
                }
                {
                    <CheckboxGroup name="test" options={[{label: "test", value: "test"}, {label: "test2", value: "test2"}]} onChange={(e) => {}} />
                }
                {
                    <DataListInput options={[{label: "test", value: "test"}, {label: "test2", value: "test2"}]} onChange={(e) => {}} />
                }
                {
                    <Text type={TextInputTypes.PASSWORD} acceptMultiple={true} onChange={(e) => {}} onKeyDown={(e) => {}} value="+917652017624" />
                }
                {
                    <Text acceptMultiple={true} onChange={(e) => {}} onKeyDown={(e) => {}} value="7652017624" />
                }
                {
                    step === 1 &&
                        <DonorInfo donorInformation={INITIAL_DONOR_INFO}  handleDonorSubmit={handleDonorSubmit} />
                }
                {
                    step === 2 &&
                        <DonationInfo currencies={currencies} donationInfo={INITIAL_DONATION_INFO} donorId={donorId} handleDonationSubmit={handleDonationSubmit} />
                }
                {
                    step === 3 &&
                        <div>
                            <h1>Thank you for your donation!</h1>
                        </div>
                }
            </DonateContainer>
        </>
    );
};

export default DonatePage;
