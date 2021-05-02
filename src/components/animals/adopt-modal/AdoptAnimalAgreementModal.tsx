import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AdoptAnimalAgreementModal() {
  const [openAdoptAnimal, setOpenAdoptAnimal] = useState(false);

  const handleClickOpenAdoptModal = () => {
    setOpenAdoptAnimal(true);
  };

  const handleClickCloseAdoptModal = () => {
    setOpenAdoptAnimal(false);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpenAdoptModal}>
        Adopt this animal
      </Button>
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
          <Button onClick={handleClickCloseAdoptModal} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
