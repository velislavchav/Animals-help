import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { IAnimal } from '../../../models/IAnimal';
import { AnimalService } from '../../../helpers/services/AnimalService';
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { UserService } from '../../../helpers/services/UserService';
import { displayLoader, hideLoader } from '../../../helpers/GeneralHelper';

export default function AdoptAnimalAgreementModal(props: IAnimal) {
  const [openAdoptAnimal, setOpenAdoptAnimal] = useState(false);
  const history = useHistory();
  const { currentUser, currentUserAdditionalData, addUserApplicationsLocally, removeUserApplicationsLocally, setLoading } = useAuth();
  const handleClickOpenAdoptModal = () => {
    setOpenAdoptAnimal(true);
  };

  const handleClickCloseAdoptModal = () => {
    setOpenAdoptAnimal(false);
  };

  const handleApplyForAdoptionAgreement = async () => {
    try {
      displayLoader();
      await AnimalService.addUserApplicationForAdoption(currentUser?.email, props);
      const updatedApplications = await addUserApplicationsLocally([props?.id]);
      await UserService.addApplicationForAdoption(currentUserAdditionalData?.email, updatedApplications);
      setOpenAdoptAnimal(false);
      setLoading(true);
      toast.success("You have successfully made request for adopting!");
      history.push("/animals");
      hideLoader();
    } catch (error) {
      toast.error("Something went wrong with the request for adopting!");
      hideLoader();
    }
  }

  const removeUserAdoptionApplication = async () => {
    try {
      await AnimalService.removeUserApplicationForAdoption(currentUser?.email, props);
      const updatedApplications = await removeUserApplicationsLocally([props?.id]);
      await UserService.removeApplicationForAdoption(currentUserAdditionalData?.email, updatedApplications);
      await setOpenAdoptAnimal(false);
      await setLoading(true);
      await toast.success("You have successfully removed your request for adopting!");
      await history.push("/animals");
    } catch (error) {
      toast.error("Something went wrong with removing the request for adopting!");
    }
  }

  return (
    <div>
      {!props.usersAppliedForAdoption.includes(currentUser.email) ?
        <Button variant="outlined" color="primary" onClick={handleClickOpenAdoptModal}> Apply for adoption </Button> :
        <Button variant="outlined" color="secondary" onClick={removeUserAdoptionApplication}> Cancel the adoption application </Button>}
      <Dialog
        open={openAdoptAnimal}
        onClose={handleClickCloseAdoptModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to adopt this animal?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to adopt this animal, the shelter will contact you as soon as possible, but also the shelter will receive all your account information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseAdoptModal} color="primary">
            Disagree
          </Button>
          <Button onClick={handleApplyForAdoptionAgreement} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
