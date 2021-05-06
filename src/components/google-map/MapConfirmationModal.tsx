import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect, useState } from 'react';
import { IMapMarker } from '../../models/IMapMarker';
import { getMarkerTitle } from '../../helpers/GeneralHelper';

export default function MapConfirmationModal({ handleMapClick, handleClickCloseModal, mapConfirmationSubmission, newMarker }: any) {
  const [markerMessage, setMarkerMessage] = useState("")

  useEffect(() => {
    if(newMarker) setMarkerMessage(getMarkerTitle(newMarker?.signalType).toLocaleLowerCase());
  }, [newMarker])

  return (
    <Dialog
      open={mapConfirmationSubmission}
      onClose={handleClickCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Do you want to signal for ${markerMessage}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This mark will be shown to all users.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCloseModal} color="primary">
          No
          </Button>
        <Button onClick={() => handleMapClick(newMarker as IMapMarker)} color="primary" autoFocus>
          Yes
          </Button>
      </DialogActions>
    </Dialog>
  );
}
