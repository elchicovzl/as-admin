import React from "react";

const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Documento", uid: "documentIdentity", sortable: true},
    {name: "Nombre Completo", uid: "fullName", sortable: true},
    {name: "Correo", uid: "email", sortable: true},
    {name: "Proceso", uid: "statusProcess"},
    {name: "Status", uid: "status", sortable: true},
    {name: "Actions", uid: "actions"},
];

const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
];
  
export {columns, statusOptions};