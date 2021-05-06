import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IAnimal } from '../../../models/IAnimal';
import { useHistory } from 'react-router';
import { UserService } from '../../../helpers/services/UserService';
import { AnimalService } from '../../../helpers/services/AnimalService';
import { toast } from 'react-toastify';

export default function DeleteAnimalModal(props: IAnimal) {
  const [openAdoptAnimal, setOpenAdoptAnimal] = useState(false);
  const history = useHistory();
  const handleClickOpenAdoptModal = () => {
    setOpenAdoptAnimal(true);
  };

  const handleClickCloseAdoptModal = () => {
    setOpenAdoptAnimal(false);
  };

  const handleDeleteAnimal = () => {
    try {
      AnimalService.deleteAnimal(props.id).then(() => {
        UserService.removeDeletedAnimalApplicationsFromAllUsers(props.id)
      }).then(() => {      
        setOpenAdoptAnimal(false);
        toast.success("You have successfully removed the animal!");
        history.push("/animals");
      })
    } catch (error) {
      toast.error("Something went wrong with the removing the animal!");
    }
  }


  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpenAdoptModal}> Delete animal </Button>
      <Dialog
        open={openAdoptAnimal}
        onClose={handleClickCloseAdoptModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to remove this animal?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this animal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseAdoptModal} color="primary">
            No
          </Button>
          <Button color="primary" onClick={handleDeleteAnimal} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
