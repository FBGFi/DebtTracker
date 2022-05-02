import React, { useContext } from 'react';

const items = [
    {
        description: "Viinaa",
        price: 666.00,
        currency: "EUR"
    },
    {
        description: "Sipsejä",
        price: 420.69,
        currency: "EUR"
    }
]
const debts: any = {
    "this-is-a-debt-description": {
        items,
        debtHolders: ["this-is-a-debt-holder-id"]
    }
};