import { format, parseISO } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/store";

import { Spinner } from "../Spinner";

export function UsersTable() {
  const { userList, isLoading } = useAppSelector((store) => store.user);
  return (
    <Table className="text-xs md:text-sm">
      {!isLoading && (
        <TableCaption>A list of users in the application.</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>SSN</TableHead>
          <TableHead>DoB</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <TableCell colSpan={5} className="text-center">
            <Spinner className="mr-2 h-4 w-4 animate-spin inline" /> Loading
            Users
          </TableCell>
        )}
        {!isLoading &&
          userList.map((user) => (
            <TableRow key={user.username}>
              <TableCell className="font-medium p-2 md:p-4">
                {user.username}
              </TableCell>
              {user.firstName ? (
                <>
                  <TableCell className="p-2 md:p-4">{user.firstName}</TableCell>
                  <TableCell className="p-2 md:p-4">{user.lastName}</TableCell>
                  <TableCell className="p-2 md:p-4">{user.phone}</TableCell>
                  <TableCell className="p-2 md:p-4">{user.SSN}</TableCell>
                  <TableCell className="p-2 md:p-4">
                    {format(parseISO(user.DoB.toString()), "MM/dd/yyyy")}
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={5} className="text-center p-2 md:p-4">
                  No Personal Information Added
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
