import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import NormalUserRegisterForm from './NormalUserRegisterForm';
import ShelterRegisterForm from './ShelterRegisterForm';
import InstituteRegisterForm from './InstituteRegisterForm';
import './RegisterForms.scss';

export default function RegisterTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square className="register-container" component="section">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
        className="register-user-tabs"
      >
        <Tab icon={<AccountCircleIcon />} label="Normal" />
        <Tab icon={<HomeWorkIcon />} label="Shelters" />
        <Tab icon={<BusinessIcon />} label="Institution" />
      </Tabs>
      {value === 0 ? <NormalUserRegisterForm/> : "" }
      {value === 1 ? <ShelterRegisterForm/> : "" }
      {value === 2 ? <InstituteRegisterForm/> : "" }
    </Paper>
  );
}