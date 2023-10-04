import React from "react";
import AutoSortTable from "../../components/Table/AutoSortTablePhysic";

import { useUserAPI, UserContextProvider } from "../../contexts/userContext";
import { UserTableHeader } from "./UsersTableHeader";
import { User, UserAddress, UserCompany } from "../../helpers/types";
import styles from "./Users.module.css";

// !!TODO handle window resize for table fit
function UsersContent() {

  const { users, fetchUsers } = useUserAPI();


  // !!TODO a bit overcoded accessors, we need to remove it from render
  const addressAccessor = (userAddress: UserAddress): string => {
    return userAddress.street;
  };

  const companyNameAccessor = (userCompany: UserCompany): string => {
    return userCompany.name;
  };

  const formatData = (dataArr: any) => {
    const formattedArr: any = [];
    dataArr.forEach((element: User) => {
      formattedArr.push({
        id: element.id,
        name: element.name,
        email: element.email,
        address: addressAccessor(element.address),
        companyName: companyNameAccessor(element.company)

      });
    });
    return formattedArr;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.usersTableWrapper}>
        <AutoSortTable
          constColumnSizes={[50]}
          columns={UserTableHeader}
          // !!TODO
          data={users && formatData(users)}
          tableRequest={fetchUsers}
        />
      </div>
    </div>
  );
}

export default function Users() {
  return (
    <UserContextProvider>
      <UsersContent />
    </UserContextProvider>
  )
}



