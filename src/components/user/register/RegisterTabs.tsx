import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import NormalUserRegisterForm from './NormalUserRegisterForm';
import ShelterRegisterForm from './ShelterRegisterForm';
import InstituteRegisterForm from './InstituteRegisterForm';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 625,
  },
  tabs: {
    marginBottom: "25px"
  }
});

export default function RegisterTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root} component="section">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
        className={classes.tabs}
      >
        <Tab icon={<AccountCircleIcon />} label="Normal" />
        <Tab icon={<HomeWorkIcon />} label="Shelters" />
        <Tab icon={<BusinessIcon />} label="Institute" />
      </Tabs>
      {value === 0 ? <NormalUserRegisterForm/> : "" }
      {value === 1 ? <ShelterRegisterForm/> : "" }
      {value === 2 ? <InstituteRegisterForm/> : "" }
    </Paper>
  );
}