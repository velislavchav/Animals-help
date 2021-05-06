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
import { INormalUser } from '../../../models/INormalUser';

export default function AdoptAnimalAgreementModal(props: IAnimal) {
  const [openAdoptAnimal, setOpenAdoptAnimal] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const handleClickOpenAdoptModal = () => {
    setOpenAdoptAnimal(true);
  };

  const handleClickCloseAdoptModal = () => {
    setOpenAdoptAnimal(false);
  };

  const handleApplyForAdoptionAgreement = () => {
    try {
      AnimalService.addUserApplicationForAdoption(currentUser?.email, props).then(() => {
        UserService.addApplicationForAdoption(currentUser as INormalUser, props?.id)
      }).then(() => {      
        setOpenAdoptAnimal(false);
        toast.success("You have successfully made request for adopting!");
        history.push("/animals");
      })
    } catch (error) {
      toast.error("Something went wrong with the request for adopting!");
    }
  }

  const removeUserAdoptionApplication = () => {
    try {
      AnimalService.removeUserApplicationForAdoption(currentUser?.email, props).then(() => {
        UserService.removeApplicationForAdoption(currentUser as INormalUser, props?.id)
      }).then(() => {
        history.push("/animals");
        toast.success("You have successfully removed your request for adopting!");
        setOpenAdoptAnimal(false);
      })
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
