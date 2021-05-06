import { DataGrid, GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserService } from "../../../helpers/services/UserService";
import { INormalUser } from "../../../models/INormalUser";

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
  const [usersApplication, setUsersApplication] = useState<INormalUser[]>([]);

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

  return (
    <>
      {usersApplication.length > 0 ?
        <>
          <span className="users-adopting-applications-table-title"> Applications from users for adopting this animal </span>
          <section className="users-adopting-applications-table">
            <DataGrid rows={usersApplication} columns={columns} pageSize={5} checkboxSelection />
          </section>
        </> : <></>}
    </>
  );
}
