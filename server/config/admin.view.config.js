const overview = {
  User: {
    database_col: ["_id", "user_name", "email", "full_name", "role"],
    display_col: ["Id", "User-Name", "Email", "Name", "Role"],
  },
  Hotel: {
    database_col: ["_id", "id_manager", "full_address", "status", "prioryty"],
    display_col: ["ID", "Manager", "Address", "Status", "Priority"],
  },
  Utility: {
    database_col: [
      "_id",
      "id_manager",
      "house_number",
      "street_name",
      "id_ward",
    ],
    display_col: ["ID", "Name", "HTML Tag", "Icon"],
  },
};

const detail = {
  User: {
    database_col: [
      "_id",
      "user_name",
      "email",
      "first_name",
      "last_name",
      "role",
    ],
    display_col: [
      "Id",
      "User Name",
      "Email",
      "Frist Name",
      "Last Name",
      "Role",
    ],
  },
  Hotel: {
    database_col: ["_id", ""],
    display_col: ["ID", "Address", "", "Status"],
  },
};

const create = {
  User: {
    database_col: [
      "_id",
      "user_name",
      "email",
      "first_name",
      "last_name",
      "role",
    ],
    display_col: [
      "Id",
      "User Name",
      "Email",
      "Frist Name",
      "Last Name",
      "Role",
    ],
  },
  Hotel: {
    database_col: ["_id", ""],
    display_col: ["ID", "Address", "", "Status"],
  },
};

const edit = {
  User: {
    database_col: [
      "_id",
      "user_name",
      "email",
      "first_name",
      "last_name",
      "role",
    ],
    display_col: [
      "Id",
      "User Name",
      "Email",
      "Frist Name",
      "Last Name",
      "Role",
    ],
  },
  Hotel: {
    database_col: ["_id", ""],
    display_col: ["ID", "Address", "", "Status"],
  },
};

module.exports = { overview, detail, create, edit };
