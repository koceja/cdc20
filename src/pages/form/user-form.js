import React from 'react';
import { Box, Button, Card, Flex} from 'rebass';
import { Input, Label, Select } from '@rebass/forms';

import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';

import ClipLoader from "react-spinners/ClipLoader";


import './user-form.css';


const inputs = [
    {
        field: "income",
        label: "Income"
    },
    {
        field: "loanAmt",
        label: "Loan Amount",
    },
    {
        field: "propertyVal",
        label: "Property Value",
    },
    {
        field: "occupiedUnits",
        label: "Tract Owner Occupied Units",
    },
]

const selects = [
    {
        field: "type",
        label: "Loan Type",
        options: [
            {
                key: 1,
                value: "1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)"
            },
            {
                key: 2,
                value: "2 - Federal Housing Administration insured (FHA)",

            },
            {
                key: 3,
                value: "3 - Veterans Affairs guaranteed (VA)"
            },
            {
                key: 4,
                value: "4 - USDA Rural Housing Service or Farm Service Agency guaranteed (RHS or FSA)"
            }
        ]
    },
    {
        field: "purpose",
        label: "Loan Purpose",
        options: [
            {
                key: 1,
                value: "1 - Home purchase"
            },
            {
                key: 2,
                value: "2 - Home improvement"
            },
            {
                key: 31,
                value: "31 - Refinancing"
            },
            {
                key: 32,
                value: "32 - Cash-out refinancing"
            },
            {
                key: 4,
                value: "4 - Other purpose"
            },
            {
                key: 5,
                value: "5 - Not applicable"
            }
        ]
    },
    {
        field: "businessOrCommercial",
        label: "Purpose Type",
        options: [
            {
                key: 1,
                value: "1 - Primarily for a business or commercial purpose"
            },
            {
                key: 2,
                value: "2 - Not primarily for a business or commercial purpose"
            },
            {
                key: 1111,
                value: "1111 - Exempt"
            }
        ]
    }

]

class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            success: false,
            submitted: false,
        }

        this.submitApi = this.submitApi.bind(this);
    }

    submitApi(e) {
        e.preventDefault();

        let body = {};

        for (let i = 0; i < inputs.length; i++) {
            const property = inputs[i].field;
            const value = e.target.elements[property].value;
            if (value === "" || value < 0) {
                return;
            } 
            body[property] = value;
        }

        for (let i = 0; i < selects.length; i++) {
            const property = selects[i].field;

            const value = e.target.elements[property].value;
            let key = selects[i].options.filter((option) => {
                return option.value === value
              })
            key = key[0].key;
            body[property] = key;
        }

        this.setState({
            submitted: true,
            loading: true
        });

        const processResponse = (isSuccess) => {
            console.log(isSuccess.results);
            if (isSuccess === 1) {
                isSuccess = true;
            } else {
                const value = Math.floor(isSuccess.results.results * 2);
                console.log(value);
                isSuccess = (value === 1) ? true : false;
                console.log(isSuccess);
            }

            this.props.approve(isSuccess);
            this.setState({
                loading: false,
                success: isSuccess
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        fetch('https://cors-anywhere.herokuapp.com/https://mortgage-cdc-20.herokuapp.com/', requestOptions)
            .then(res => {
                if (res.ok) {
                    const results = res.json();
                    return results;
                } else {
                    return 0;
                }})
            
            .then(processResponse)




    }

    render() {
        return (<div id="user-form">
            <hr />
            <div className="page-header">
                <h1>Approval Predictor</h1>
            </div>

            <Box as='form' px={3} py={2} width={1} onSubmit={this.submitApi}>
                <Card style={{ padding: "20px" }}>
                    <Flex className="form-content" flexWrap='wrap' mx={0}>
                        <div className="form-fields">
                            {inputs.map((section) => (<div className="form-field">
                                <Label htmlFor={section.field}>
                                    {section.label}
                                </Label>
                                <Input
                                    id={section.field}
                                    name={section.field}
                                    type="number"
                                    min={0}
                                />
                            </div>))}
                            {selects.map((section) => (<div className="form-field">
                                <Label htmlFor={section.field}>
                                    {section.label}
                                </Label>
                                <Select
                                    id={section.field}
                                    name={section.field}
                                >
                                    {section.options.map((option) => (
                                        <option
                                            key={option.key}>
                                            {option.value}
                                        </option>
                                    ))}
                                </Select>
                            </div>))}
                        </div>

                        <div id="approval-status">
                            <div>
                                {(!this.state.submitted) ? <h2>Please enter your information</h2> : (this.state.loading) ? <div id="loader"><ClipLoader
                                    css={null}
                                    size={150}
                                    color={"#999999"}
                                    loading={true}
                                /></div> : (this.state.success) ? <><div><AiFillCheckCircle className="icon" style={{ color: "#31aa3c" }} /></div><h2 style={{ color: "#31aa3c" }}>Accepted</h2></> : <><div><AiOutlineClose className="icon" style={{ color: "#ff5353" }} /></div><h2 style={{ color: "#ff5353" }}>Denied</h2></>}
                            </div>
                            <Button type="submit">
                                Predict
                            </Button>
                        </div>
                    </Flex>

                </Card>

            </Box>
        </div>);
    }
}

export default UserForm;