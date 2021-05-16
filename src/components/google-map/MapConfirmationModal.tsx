import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect, useState } from 'react';
import { IMapMarker } from '../../models/IMapMarker';
import { getMarkerTitle } from '../../helpers/GeneralHelper';

export default function MapConfirmationModal({ handleMapClick, handleClickCloseModal, mapConfirmationSubmission, newMarker, newMarkerImages, uploadMarkerImagesLocally }: any) {
  const [markerMessage, setMarkerMessage] = useState("")
  useEffect(() => {
    if (newMarker) setMarkerMessage(getMarkerTitle(newMarker?.signalType).toLocaleLowerCase());
  }, [newMarker])

  return (
    <Dialog
      open={mapConfirmationSubmission}
      onClose={handleClickCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Do you want to signal for ${markerMessage}?`}
        <input accept="image/*" className="disp-none" id="upload-file-button" multiple type="file" onChange={uploadMarkerImagesLocally} />
        <label htmlFor="upload-file-button">
          <IconButton color="primary" aria-label="upload picture" component="span" className={newMarkerImages?.length > 0 ? "loaded-files-icon" : ""}>
            <PhotoCamera />
          </IconButton>
        </label>
      </DialogTitle>
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