const rows = [
  {
    id: "test-1",
    firstName: "Bobby",
    lastName: "Johnson",
    photo: "https://picsum.photos/id/237/200/300",
    file: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "test-2",
    firstName: "CJ",
    lastName: "Wee",
    role: {
      id: "role-1",
    },
  },
];

export default {
  default: {
    name: "Default",
    props: {
      columns: [
        {
          label: "First Name",
          key: "firstName",
          type: "string",
        },
        {
          label: "Last Name",
          key: "lastName",
          type: "string",
        },
        {
          label: "Role",
          key: "role",
          type: "select",
          options: [{ label: "Role One", value: "role-1" }],
        },
      ],
      rows,
    },
  },
  edit: {
    name: "Edit Mode",
    props: {
      edit: true,
      showDelete: true,
      columns: [
        {
          label: "Photo",
          key: "photo",
          type: "photo",
        },
        {
          label: "First Name",
          key: "firstName",
          type: "string",
          active: true,
        },
        {
          label: "Last Name",
          key: "lastName",
          type: "string",
        },
        {
          label: "Role",
          key: "role.id",
          type: "select",
          options: [{ label: "Role One", value: "role-1", a: 1 }],
        },
        {
          label: "File",
          key: "file",
          type: "file",
        },
        {
          label: "Active",
          key: "active",
          type: "boolean",
        },
      ],
      rows,
    },
  },
};
