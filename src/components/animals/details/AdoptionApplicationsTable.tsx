import { DataGrid, GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { AnimalService } from "../../../helpers/services/AnimalService";
import { UserService } from "../../../helpers/services/UserService";
import { INormalUser } from "../../../models/INormalUser";
import DeleteIcon from '@material-ui/icons/Delete';

const columns: GridColDef[] = [
  {
    field: 'email', headerName: 'User email', width: 200,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 200,
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'phone',
    headerName: 'Phone number',
    width: 230,
  },
];

export default function AdoptionApplicationsTable(props: any) {
  const animalId = props.animalId;
  const history = useHistory();
  const [usersApplication, setUsersApplication] = useState<INormalUser[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]) //emails of the users

  useEffect(() => {
    const result: INormalUser[] = [];
    try {
      UserService.getUsersApplicationsForAdopting(props?.applicationsForAdoption).then(data => {
        data.forEach((normalUser: INormalUser) => {
          result.push({ ...normalUser, id: normalUser?.email })
        });
        setUsersApplication(result as INormalUser[]);
      })
    } catch {
      toast.error("Something went wrong with extracting users applications.")
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteApplications = async () => {
    try {
      await AnimalService.removeMultipleUsersApplicationForAdoption(selectedApplications, animalId, props.applicationsForAdoption).then(() => {
        UserService.removeApplicationOnMultipleUsersForAdoption(selectedApplications, animalId).then(() => {
          history.push("/animals");
          toast.success("You have successfully removed the applications for adopting!");
        })
      });
    } catch (error) {
      toast.error("Something went wrong with removing the applications for adopting!");
    }
  }

  const handleRowsSelected = (dataSelected: any) => {
    setSelectedApplications(dataSelected?.selectionModel as string[])
  }

  return (
    <>
      {usersApplication.length > 0 ?
        <>
          <div className="adopting-table-top">
            <span className="users-adopting-applications-table-title"> Applications from users for adopting this animal </span>
            {selectedApplications?.length > 0 ? <span className="delete-adopting-applications-btn"><DeleteIcon fontSize="default" onClick={handleDeleteApplications}></DeleteIcon>Delete selected items </span> : <></>}
          </div>
          <section className="users-adopting-applications-table">
            <DataGrid rows={usersApplication} columns={columns} pageSize={5} checkboxSelection
              // onRowSelected={(e) => handleRowsSelected(e?.data as INormalUser[])} 
              onSelectionModelChange={itm => handleRowsSelected(itm as any)} />
          </section>
        </> : <></>}
    </>
  );
}
