// Dependencies
import * as React from 'react';
import {
    SquarePaymentsForm,
    CreditCardInput,
} from 'react-square-web-payments-sdk';

const MyPaymentForm = () => (

    <SquarePaymentsForm
        applicationId="sandbox-sq0idb-7KE3zXHZLG_X5EmLLptTYw"
        cardTokenizeResponseReceived={function noRefCheck() { }}
       // createVerificationDetails={function noRefCheck() { }}
        locationId="4P550BZQ0TQZA"
    >
        <CreditCardInput
            focus="cardNumber"
            overrideStyles={{}}
        />
    </SquarePaymentsForm>
);

export default MyPaymentForm;