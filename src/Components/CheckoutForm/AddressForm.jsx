import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';
 
import FormInput  from './CustomTextField';

const AddressForm = ({ checkoutToken }) => {
    const methods = useForm();
    const [shippingCoutries, setShippingCoutries] = useState([]);
    const [shippingCoutry, setShippingCoutry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCoutries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((sOp) => ({ id: sOp.id, label: `${sOp.description} - (${sOp.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checoutTokenId)
        
        setShippingCoutries(countries); 
        setShippingCoutry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options );
        setShippingOption(options[0].id);
    } 

    useEffect(() =>  {
        fetchShippingCountries(checkoutToken.id)
    },[]);

    useEffect(() =>  {
        if(shippingCoutry) fetchSubdivisions(shippingCoutry);
    },[shippingCoutry]);

    useEffect(() => {
       if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCoutry, shippingSubdivision);
    },[shippingSubdivisions])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shoppimg Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First name' />
                        <FormInput name='lastName' label='Last name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='ZIP / Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCoutry} fullWidth onChange={(e) => setShippingCoutry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                ))} 
                            </Select>
                        </Grid>                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                ))} 
                            </Select>
                        </Grid>
                    </Grid>
                </form>                
            </FormProvider>
        </>
    )
}

export default AddressForm
