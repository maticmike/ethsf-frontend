import React, { useState } from "react";
import { useStyles } from './styles';
import { Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button,
    TextField,
    MenuItem, 
    Box,
    Typography
} from "@material-ui/core";

const DisputeModal = ({ open, close }) => {
    const [selectedAttribute, setAttribute] = useState('');
    const handleChange = e => {
        let boundMethod = e.target.value
        setAttribute(boundMethod)
    }

    const clearAttribute = () => {
        setAttribute('')
        close()
    }

    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const getParamNames = (func) =>  {
        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if(result === null)
            result = [];
        return result;
    }

    // Inherit Fund Details from Parent Component or Store 
    const mockFundDetails = { 
            fundName: 'Smith Family Fund', 
            depositedAmount: '30 Eth', 
            vestingDate: 'Feb 2030', 
            fundId: 1, 
            beneficiary: 'Lucky Child', 
            grantor: 'Loving Parents'
        }

    // TODO: This would need to be a lifecycle hook to query the contract (I guess?), iterate through and grab potential
    //       functions that can be invoked
    const mockContractFunctions = {
        changeWalletAddress: (oldAddress, targetAddress) => { console.log('Simple Bound Method for updating wallet')}, 
        updateMeritHours: (hourRequirement) => { console.log('Simple Bound Method for updating Merit Hours')}
    }


    const classes = useStyles();
    return (
        <div>
            <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={close}>
                <DialogTitle align='center'>File a SoulFund Dispute</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <Typography align='center'>
                            You are planning to submit a dispute for the following SoulFund
                        </Typography>
                        <DialogContentText align='center'>
                        {mockFundDetails.fundName}
                        </DialogContentText>
                        <TextField
                            required
                            multiline
                            maxRows={4}
                            margin="dense"
                            id="outlined-required"
                            label="Dispute Description"
                            placeholder="Detailed description of dispute..."
                            fullWidth
                        />
                        <div>
                            <TextField
                                id="outlined-select"
                                select
                                label="Attribute to Update"
                                onChange={handleChange}
                                helperText="Please select which attribute to update"
                                >
                                {Object.entries(mockContractFunctions).map((boundMethod) => (
                                    <MenuItem key={boundMethod[0]} value={boundMethod[0]}>
                                        {boundMethod[0]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div>
                        { selectedAttribute !== '' ? 
                            // This map will actually need to be more complex to consider param types and render
                            //  a form that is appropriate for the param type
                            getParamNames(mockContractFunctions[selectedAttribute]).map((param, idx) => (
                                <TextField
                                    id="outlined-select"
                                    required
                                    label={param}
                                />
                            ))
                            :
                            <div></div>}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearAttribute} variant='contained' color='secondary'>Cancel</Button>
                    <Button onClick={clearAttribute} variant='contained' color='primary'>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default DisputeModal;